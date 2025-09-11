import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { TooltipPropsType } from "@minus-ui/types";
import TooltipBubble from "./TooltipBubble";

export function Tooltip(props: TooltipPropsType) {
  const {
    contents,
    bubbleContents,
    position,
    size,
    textColor = "default",
    isTail = true,
    isShowBubble = true,
    isDraggable = false,
    isCheckOverflow = false,
    boxClassName,
    boxContentClassName,
    bubbleContentClassName = "",
  } = props;
  const bubbleBoxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [isTextOverflow, setIsTextOverflow] =
    useState<boolean>(!isCheckOverflow);

  const draggableClass = isDraggable ? " draggable" : " non-draggable";
  const observeBubbleBox = useCallback(() => {
    if (!bubbleBoxRef.current) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const { clientWidth, clientHeight } = entry.target;

          if (entry.intersectionRatio > 0) {
            setDimensions({ width: clientWidth, height: clientHeight });
          }
        }
      });
    });

    observer.observe(bubbleBoxRef.current);
  }, []);

  useEffect(() => {
    observeBubbleBox();
    window.addEventListener("resize", observeBubbleBox);
    return () => {
      window.removeEventListener("resize", observeBubbleBox);
    };
  }, [observeBubbleBox, size]);

  const handleCheckOverflow = (e: MouseEvent<HTMLParagraphElement>) => {
    if (!isCheckOverflow) {
      return;
    }
    if (e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
      setIsTextOverflow(true);
      return;
    }
    setIsTextOverflow(false);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     observeBubbleBox();
  //   }, 300);
  // }, [observeBubbleBox, isTextOverflow]);

  useEffect(() => {
    setIsTextOverflow(!isCheckOverflow);
  }, [isCheckOverflow]);

  return (
    <div
      ref={bubbleBoxRef}
      className={`bubble-box${draggableClass} relative ${boxClassName}`}
    >
      <div
        className={`bubble-box__contents ${boxContentClassName}`}
        onMouseEnter={handleCheckOverflow}
      >
        {contents}
      </div>
      {isShowBubble && isTextOverflow && (
        <TooltipBubble
          position={position}
          size={size}
          isTail={isTail}
          contents={bubbleContents}
          parentDimension={dimensions}
          textColor={textColor}
          bubbleContentClassName={bubbleContentClassName}
        />
      )}
    </div>
  );
}
