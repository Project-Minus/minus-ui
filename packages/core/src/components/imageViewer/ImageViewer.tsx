import useBodyScrollLock from "./useBodyScollLock";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot, Root } from "react-dom/client";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import {
  CgArrowsVAlt,
  CgArrowsHAlt,
  CgCornerUpLeft,
  CgCornerUpRight,
} from "react-icons/cg";
import { ImageViewerConfig } from "../../types";

interface Props {
  url: string;
  closeViewer: () => void;
}

type Axis = "X" | "Y" | "Z";

export function ImageViewer({ url, closeViewer }: Props) {
  const { openScroll, lockScroll } = useBodyScrollLock();
  const imageContentRef = useRef<HTMLDivElement>(null);
  const [zoomBlock, setZoomBlock] = useState<{
    zoomIn: boolean;
    zoomOut: boolean;
  }>({ zoomIn: false, zoomOut: false });
  const [isMouseHold, setIsMouseHold] = useState<boolean>(false);
  const [rotateLeftAndRight, setRotateLeftAndRight] = useState<number>(0);
  const [imageStartPoint, setImageStartPoint] = useState<Record<Axis, number>>({
    X: 1,
    Y: 1,
    Z: 1,
  });
  const [imageScale, setImageScale] = useState<Record<Axis, number>>({
    X: 1,
    Y: 1,
    Z: 1,
  });
  const [imageTranslate, setImageTranslate] = useState<Record<Axis, number>>({
    X: 0,
    Y: 0,
    Z: 0,
  });

  const getZoomBlockStyle = (zoomBlockValue: boolean) => {
    if (zoomBlockValue) {
      return { color: "rgba(155,155,155,1)" };
    }
    return {};
  };

  const handleImageScale = (
    type: "flip" | "scale",
    rotateKey: Axis,
    rotateValue: number,
  ) => {
    if (type === "flip") {
      setImageScale((prev) => {
        return {
          ...prev,
          [rotateKey]: imageScale[rotateKey] * -1,
        };
      });
      return;
    }
    setImageScale((prev) => {
      return {
        ...prev,
        [rotateKey]: rotateValue,
      };
    });
  };
  const handleImageStartPoint = (startKey: Axis, startValue: number) => {
    setImageStartPoint((prev) => {
      return {
        ...prev,
        [startKey]: startValue,
      };
    });
  };
  const resetTranslate = () => {
    setImageTranslate({
      X: 0,
      Y: 0,
      Z: 0,
    });
  };
  const handleImageTranslate = (translateKey: Axis, translateValue: number) => {
    setImageTranslate((prev) => {
      return {
        ...prev,
        [translateKey]: translateValue,
      };
    });
  };
  const handleZoom = (type: keyof typeof zoomBlock) => {
    const anotherZoomType = type === "zoomIn" ? "zoomOut" : "zoomIn";
    if (zoomBlock[type]) {
      return;
    }
    const typeCorrection = type === "zoomIn" ? 1.5 : 2 / 3;
    const newZoomX = imageScale.X * typeCorrection;
    const newZoomY = imageScale.Y * typeCorrection;
    const blockCondition = type === "zoomIn" ? newZoomX > 2 : newZoomX < 0.5;

    if (blockCondition) {
      setZoomBlock((prev) => {
        return {
          ...prev,
          [type]: true,
        };
      });
    } else {
      setZoomBlock((prev) => {
        return {
          ...prev,
          [anotherZoomType]: false,
        };
      });
    }
    resetTranslate();
    handleImageScale("scale", "X", newZoomX);
    handleImageScale("scale", "Y", newZoomY);
  };

  useEffect(() => {
    lockScroll();

    return () => {
      openScroll();
    };
  }, [lockScroll, openScroll]);

  useEffect(() => {
    if (isMouseHold) {
      const handlePointerMove = (e: PointerEvent) => {
        const { clientX, clientY } = e;
        // console.log(imageContentRef.current?.clientWidth);
        const deltaX = clientX - imageStartPoint.X;
        const deltaY = clientY - imageStartPoint.Y;

        // flip 되었을 때 마우스 움직임 변환치
        const reverseScaleX = imageScale.X > 0 ? 1 : -1;
        const reverseScaleY = imageScale.Y > 0 ? 1 : -1;

        // zoom에 따른 이동속도 보정치
        const zoomCorrection = 1 / Math.abs(imageScale.X);
        // flip 여부에 따른 보정치
        const sameBothScale = imageScale.X * imageScale.Y > 0 ? 1 : -1;
        const reverseSameBothScale = sameBothScale * -1;

        // 이동값 계산기
        const getTranslatePosition = (
          originAxis: Axis,
          translateAxis: Axis,
          zoomCorrectionNum: number,
          correction: number,
        ) => {
          // originAxis : 기본 기준 축 , translateAxis: flip, rotate에 따라 변경된 축, correction: 보정치
          if (translateAxis === "X") {
            return (
              imageTranslate[originAxis] +
              deltaX * reverseScaleX * zoomCorrectionNum * correction
            );
          }
          return (
            imageTranslate[originAxis] +
            deltaY * reverseScaleY * zoomCorrectionNum * correction
          );
        };
        let translateX = getTranslatePosition("X", "X", zoomCorrection, 1);
        let translateY = getTranslatePosition("Y", "Y", zoomCorrection, 1);

        // 좌우 회전 확인
        const reverseRotate = rotateLeftAndRight > 0 ? 1 : -1;

        // 좌우 회전 시 같은 값으로 변환
        let rotateNum = 0;
        if (reverseRotate > 0) {
          rotateNum = rotateLeftAndRight % 4;
        } else {
          rotateNum = (4 + (rotateLeftAndRight % 4)) % 4;
        }

        // 회전량에 따른 보정치 적용
        if (rotateNum === 1) {
          translateX = getTranslatePosition(
            "X",
            "Y",
            zoomCorrection,
            sameBothScale,
          );
          translateY = getTranslatePosition(
            "Y",
            "X",
            zoomCorrection,
            reverseSameBothScale,
          );
        }
        if (rotateNum === 2) {
          if (sameBothScale > 0) {
            translateX = getTranslatePosition(
              "X",
              "X",
              zoomCorrection,
              reverseSameBothScale,
            );
            translateY = getTranslatePosition(
              "Y",
              "Y",
              zoomCorrection,
              reverseSameBothScale,
            );
          } else {
            translateX = getTranslatePosition(
              "X",
              "X",
              zoomCorrection,
              sameBothScale,
            );
            translateY = getTranslatePosition(
              "Y",
              "Y",
              zoomCorrection,
              sameBothScale,
            );
          }
        }
        if (rotateNum === 3) {
          translateX = getTranslatePosition(
            "X",
            "Y",
            zoomCorrection,
            reverseSameBothScale,
          );
          translateY = getTranslatePosition(
            "Y",
            "X",
            zoomCorrection,
            sameBothScale,
          );
        }

        requestAnimationFrame(() => {
          handleImageTranslate("X", translateX);
          handleImageTranslate("Y", translateY);

          handleImageStartPoint("X", e.clientX);
          handleImageStartPoint("Y", e.clientY);
        });
      };

      const handlePointerUp = () => {
        setIsMouseHold(false);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [
    isMouseHold,
    imageStartPoint,
    imageTranslate,
    imageScale,
    rotateLeftAndRight,
  ]);
  const imageTransition = isMouseHold
    ? "transform 0s cubic-bezier(0.215, 0.61, 0.355, 1) 0s,scale 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s, rotate 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
    : "transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s,scale 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s, rotate 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s";
  return createPortal(
    <div
      className="imageViewerWrapper"
      onMouseDown={closeViewer}
      style={{ cursor: isMouseHold ? "grabbing" : "default" }}
    >
      <div className="viewerPort">
        <div
          ref={imageContentRef}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          className="viewerContent"
          style={{
            transform: `translate3d(${imageTranslate.X}px, ${imageTranslate.Y}px, ${imageTranslate.Z}px)`,
            rotate: `z ${rotateLeftAndRight * 90}deg`,
            scale: `${imageScale.X} ${imageScale.Y} ${imageScale.Z}`,
            // rotate와 scale에만 transition 적용
            transition: imageTransition,
          }}
        >
          <img
            src={url}
            alt=""
            draggable={false}
            style={{
              objectFit: "contain",
              cursor: isMouseHold ? "grabbing" : "grab",
              filter: "hue-rotate(90deg)",
            }}
            onMouseDown={(e) => {
              handleImageStartPoint("X", e.clientX);
              handleImageStartPoint("Y", e.clientY);
              setIsMouseHold(true);
            }}
            onMouseUp={() => {
              setIsMouseHold(false);
            }}
            onMouseMove={() => {
              if (!isMouseHold) {
                return;
              }
            }}
          />
        </div>
      </div>
      <div
        className="viewerButtons"
        key={url}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <CgArrowsVAlt
          className="icon"
          onClick={() => {
            resetTranslate();
            handleImageScale("flip", "Y", 180);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        />
        <CgArrowsHAlt
          className="icon"
          onClick={() => {
            resetTranslate();
            handleImageScale("flip", "X", 180);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        />
        <CgCornerUpLeft
          onClick={() => {
            resetTranslate();
            const newRotateCount = rotateLeftAndRight - 1;
            setRotateLeftAndRight(newRotateCount);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className="icon"
        />
        <CgCornerUpRight
          onClick={() => {
            resetTranslate();
            const newRotateCount = rotateLeftAndRight + 1;
            setRotateLeftAndRight(newRotateCount);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className="icon"
        />
        <AiOutlineZoomIn
          className="icon"
          onClick={() => {
            handleZoom("zoomIn");
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          style={{ ...getZoomBlockStyle(zoomBlock.zoomIn) }}
        />
        <AiOutlineZoomOut
          className="icon"
          onClick={() => {
            handleZoom("zoomOut");
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          style={{ ...getZoomBlockStyle(zoomBlock.zoomOut) }}
        />
      </div>
    </div>,
    document.getElementById("image-viewer-root") as HTMLElement,
  );
}

let imageViewerRoot: Root | null = null;

const getImageViewerRoot = () => {
  let container = document.getElementById("image-viewer-root");
  // root 컨테이너 없으면 새로 생성
  if (!container) {
    container = document.createElement("div");
    container.id = "image-viewer-root";
    document.body.appendChild(container);
  }

  // 기존 root가 있으면 반환
  if (imageViewerRoot) {
    return imageViewerRoot;
  }

  // 없으면 새 root 생성
  imageViewerRoot = createRoot(container);
  return imageViewerRoot;
};

const closeViewer = () => {
  if (imageViewerRoot) {
    imageViewerRoot.unmount();
    imageViewerRoot = null;
  }
};

ImageViewer.open = (config: ImageViewerConfig) => {
  const { url } = config;
  const imageRoot = getImageViewerRoot();

  imageRoot.render(<ImageViewer url={url} closeViewer={closeViewer} />);
};
