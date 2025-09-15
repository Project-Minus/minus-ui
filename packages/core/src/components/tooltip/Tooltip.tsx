import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import TooltipBubble from "./TooltipBubble";
import { TooltipPropsType } from "../../types";
import { cn } from "../utils";

/**
 * Tooltip 컴포넌트
 *
 * 트리거 요소(자식)에 마우스를 올리면 인접 위치에 말풍선(툴팁)을 표시합니다.
 * 꼬리(삼각형) 표시, 드래그 이동, 콘텐츠 오버플로우 감지(말줄임일 때만 표시) 등을 지원합니다.
 *
 * @example
 * // 기본 사용
 * <Tooltip contents="Hello!">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 *
 * @param {TooltipPropsType} props - Tooltip 속성 집합
 * @param {React.ReactNode} props.children
 *   트리거 요소. 이 요소에 hover되면 툴팁이 표시됩니다.
 * @param {React.ReactNode | string} props.contents
 *   툴팁 말풍선 내부에 렌더링할 콘텐츠.
 * @param {"top"|"bottom"|"left-top"|"right-top"|"left-bottom"|"right-bottom"} [props.position="top"]
 *   트리거 대비 말풍선의 위치.
 * @param {boolean} [props.isTail=true]
 *   말풍선의 꼬리(삼각형)를 표시할지 여부.
 * @param {boolean} [props.isShowBubble=true]
 *   강제 표시/비표시 플래그. `false`이면 hover되어도 렌더링하지 않습니다.
 * @param {boolean} [props.isDraggable=false]
 *   표시된 말풍선을 드래그로 이동 가능하게 할지 여부.
 * @param {boolean} [props.isCheckOverflow=false]
 *   `true`이면 트리거 콘텐츠가 영역을 넘칠 때(예: 말줄임)만 말풍선을 표시합니다.
 *   내부적으로 측정 요소의 scroll/client 크기를 비교합니다.
 * @param {string} [props.backgroundColor="#333333"]
 *   말풍선 배경색. `#333`, `rgb(...)`, `oklch(...)`, 말풍선 꼬리 색 또한 이를 따라감.
 * @param {string} [props.containerClassName]
 *   바깥 컨테이너(div)에 추가할 클래스(예: Tailwind 유틸).
 * @param {string} [props.contentClassName=""]
 *   말풍선 내용 영역에 추가할 클래스(텍스트 색/크기 등).
 *
 * @returns {JSX.Element}
 */
export function Tooltip(props: TooltipPropsType) {
  const {
    children,
    contents,
    position = "top",
    isTail = true,
    isShowBubble = true,
    isDraggable = false,
    isCheckOverflow = false,
    backgroundColor = "#333333",
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

  const containerClass = cn(containerClassName, "minus-ui-tooltip-container");

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
    const target = e.target as HTMLParagraphElement;
    if (!isCheckOverflow) {
      return;
    }
    if (target.scrollWidth > target.clientWidth) {
      setIsTextOverflow(true);
      return;
    }
    setIsTextOverflow(false);
  };

  useEffect(() => {
    setTimeout(() => {
      observeBubbleBox();
    }, 0);
  }, [observeBubbleBox, isTextOverflow]);

  return (
    <div
      ref={bubbleBoxRef}
      className={containerClass}
      onMouseEnter={handleCheckOverflow}
    >
      {isShowBubble && isTextOverflow && (
        <TooltipBubble
          contents={contents}
          position={position}
          isTail={isTail}
          isDraggable={isDraggable}
          parentDimension={dimensions}
          backgroundColor={backgroundColor || "#333333"}
          contentClassName={contentClassName}
        />
      )}
      {children}
    </div>
  );
}
