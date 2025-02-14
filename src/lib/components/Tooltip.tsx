import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { TooltipPropsType } from "../types/tooltipType";
import TooltipBubble from "./TooltipBubble";
import "../styles/tooltip.css";

export default function Tooltip(props: TooltipPropsType) {
  const {
    contents,
    bubbleContents,
    position,
    size,
    textColor = "default",
    backgroundColor = "default",
    isTail = true,
    isShowBubble = true,
    isDraggable = false,
    checkOverflow = false,
    boxStyle,
    boxContentStyle,
  } = props;
  const bubbleBoxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(!checkOverflow);

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
    if (!checkOverflow) {
      return;
    }
    if (e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
      setIsTextOverflow(true);
      return;
    }
    setIsTextOverflow(false);
  };

  useEffect(() => {
    setTimeout(() => {
      observeBubbleBox();
    }, 300);
  }, [observeBubbleBox, isTextOverflow]);

  useEffect(() => {
    setIsTextOverflow(!checkOverflow);
  }, [checkOverflow]);

  return (
    <div
      ref={bubbleBoxRef}
      className={`bubble-box${draggableClass}`}
      style={boxStyle}
    >
      <div
        className="bubble-box__contents"
        style={boxContentStyle}
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
          backgroundColor={backgroundColor}
        />
      )}
    </div>
  );
}
