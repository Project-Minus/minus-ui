import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { TooltipPropsType } from "@minus-ui/types";
import TooltipBubble from "./TooltipBubble";

export function Tooltip(props: TooltipPropsType) {
  const {
    children,
    contents,
    position,
    isTail = true,
    isShowBubble = true,
    isDraggable = false,
    isCheckOverflow = false,
    containerClassName,
    contentClassName = "",
  } = props;
  const bubbleBoxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [isTextOverflow, setIsTextOverflow] =
    useState<boolean>(!isCheckOverflow);

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
  }, [observeBubbleBox]);

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
    // <div ref={bubbleBoxRef} className={`group relative ${boxClassName}`}>
    <div
      ref={bubbleBoxRef}
      className={`group ${containerClassName} relative`}
      onMouseEnter={handleCheckOverflow}
    >
      {isShowBubble && isTextOverflow && (
        <TooltipBubble
          position={position}
          isTail={isTail}
          contents={contents}
          parentDimension={dimensions}
          contentClassName={contentClassName}
          isDraggable={isDraggable}
        />
      )}
      {children}
    </div>
    // </div>
  );
}
