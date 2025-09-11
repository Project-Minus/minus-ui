import {
  CSSProperties,
  useLayoutEffect,
  useState,
  useRef,
  ReactNode,
  MouseEvent,
} from "react";
import { TooltipPositionType } from "@minus-ui/types";
import { cn } from "../utils";

const calcBubblePosition = (
  position:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "left-top"
    | "right-top"
    | "left-bottom"
    | "right-bottom",
  parentWidth: number,
  parentHeight: number,
  childWidth: number,
  childHeight: number,
) => {
  //위치 보정치
  const LEFT_HORIZONTAL_CORRECTION = 8;
  const VERTICAL_CORRECTION = 8;
  const COMMON_HORIZONTAL_CORRECTION = 10;
  if (!parentWidth || !parentHeight || !childWidth || !childHeight) {
    return {};
  }
  if (parentWidth && parentHeight && childWidth && childHeight) {
    switch (position) {
      case "right":
        return {
          top: parentHeight / 2 - childHeight / 2,
          left: parentWidth + LEFT_HORIZONTAL_CORRECTION,
        };
      case "left":
        return {
          top: parentHeight / 2 - childHeight / 2,
          right: parentWidth + LEFT_HORIZONTAL_CORRECTION,
        };
      case "bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2 - COMMON_HORIZONTAL_CORRECTION,
        };
      case "top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2,
        };
      case "right-top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth - childWidth * 0.9 - VERTICAL_CORRECTION,
        };
      case "left-top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          right: parentWidth - childWidth * 0.9 - VERTICAL_CORRECTION,
        };
      case "right-bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth - childWidth * 0.9 - VERTICAL_CORRECTION,
        };
      case "left-bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION,
          right: parentWidth - childWidth * 0.9 - VERTICAL_CORRECTION,
        };
      default:
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2 - COMMON_HORIZONTAL_CORRECTION,
        };
    }
  }
  return {};
};

interface Props {
  contents: ReactNode;
  parentDimension: { width: number; height: number };
  position?: TooltipPositionType;
  isTail?: boolean;
  isDraggable?: boolean;
  contentClassName: string;
}
export default function TooltipBubble(props: Props) {
  const {
    contents,
    parentDimension,
    position = "top",
    isTail,
    isDraggable,
    contentClassName,
  } = props;
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
  const bubbleRef = useRef<HTMLDivElement>(null);
  const positionClass = isTail ? ` speech-bubble--${position}` : "";
  const childWidth = bubbleRef?.current?.clientWidth;
  const childHeight = bubbleRef?.current?.clientHeight;
  const draggableClassName = isDraggable
    ? "group-hover:opacity-100 group-hover:select-text"
    : "peer-hover:opacity-100";
  // const tailClassName = isTail ? 'after:absolute after:conntent-[""]':''
  const bubbleClass = cn(
    "opacity-0 select-none",
    draggableClassName,
    "absolute",
  );
  const preventEvent = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useLayoutEffect(() => {
    const parentWidth = parentDimension.width;
    const parentHeight = parentDimension.height;
    if (!childWidth || !childHeight) {
      return;
    }
    setPositionStyle(
      calcBubblePosition(
        position,
        parentWidth,
        parentHeight,
        childWidth,
        childHeight,
      ),
    );
  }, [position, parentDimension, childWidth, childHeight]);

  return (
    <div
      onClick={preventEvent}
      ref={bubbleRef}
      style={{ ...positionStyle }}
      className={`speech-bubble${positionClass}${contentClassName} ${bubbleClass} left-[50%] bottom-[6px] border-l-9`}
    >
      {contents}
    </div>
  );
}
