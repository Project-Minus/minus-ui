import {
  CSSProperties,
  useLayoutEffect,
  useState,
  useRef,
  ReactNode,
  MouseEvent,
} from "react";
import { TooltipPositionType } from "../types/tooltipType";
import "../styles/tooltip.css";

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
  const LEFT_VERTICAL_CORRECTION = 12;
  const LEFT_HORIZONTAL_CORRECTION = 4;
  const MULTI_VERTICAL_CORRECTION = 8;
  const MULTI_HORIZONTAL_CORRECTION = 8;
  const COMMON_VERTICAL_CORRECTION = -4;
  const COMMON_HORIZONTAL_CORRECTION = 10;
  if (!parentWidth || !parentHeight || !childWidth || !childHeight) {
    return {};
  }
  if (parentWidth && parentHeight && childWidth && childHeight) {
    switch (position) {
      case "right":
        return {
          top: parentHeight / 2 - childHeight / 2 - LEFT_VERTICAL_CORRECTION,
          left: parentWidth - LEFT_HORIZONTAL_CORRECTION,
        };
      case "left":
        return {
          top: parentHeight / 2 - childHeight / 2 - LEFT_VERTICAL_CORRECTION,
          right: parentWidth - LEFT_HORIZONTAL_CORRECTION,
        };
      case "bottom":
        return {
          top: parentHeight + COMMON_VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2 - COMMON_HORIZONTAL_CORRECTION,
        };
      case "top":
        return {
          bottom: parentHeight + COMMON_VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2 - COMMON_HORIZONTAL_CORRECTION,
        };
      case "left-top":
        return {
          bottom: parentHeight + COMMON_VERTICAL_CORRECTION,
          left: parentWidth - childWidth * 0.9 - MULTI_HORIZONTAL_CORRECTION,
        };
      case "right-top":
        return {
          bottom: parentHeight + COMMON_VERTICAL_CORRECTION,
          right: parentWidth - childWidth * 0.9 - MULTI_HORIZONTAL_CORRECTION,
        };
      case "left-bottom":
        return {
          top: parentHeight - MULTI_VERTICAL_CORRECTION,
          left: parentWidth - childWidth * 0.9 - MULTI_HORIZONTAL_CORRECTION,
        };
      case "right-bottom":
        return {
          top: parentHeight - MULTI_VERTICAL_CORRECTION,
          right: parentWidth - childWidth * 0.9 - MULTI_HORIZONTAL_CORRECTION,
        };
      default:
        return {};
    }
  }
  return {};
};

interface Props {
  contents: ReactNode;
  parentDimension: { width: number; height: number };
  position?: TooltipPositionType;
  size?: string;
  isTail?: boolean;
  textColor: string;
  backgroundColor: string;
}
export default function TooltipBubble(props: Props) {
  const {
    contents,
    parentDimension,
    position = "top",
    size,
    isTail = true,
    textColor,
    backgroundColor,
  } = props;
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
  const bubbleRef = useRef<HTMLDivElement>(null);
  const positionClass = isTail ? ` speech-bubble--${position}` : "";
  const sizeClass = size ? ` speech-bubble--${size}` : "";
  const textClass = ` speech-bubble--text--${textColor}`;
  const backgroundClass = ` speech-bubble--background--${backgroundColor}`;
  const childWidth = bubbleRef?.current?.clientWidth;
  const childHeight = bubbleRef?.current?.clientHeight;

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
      style={positionStyle}
      className={`speech-bubble${positionClass}${sizeClass}${textClass}${backgroundClass}`}
    >
      {contents}
    </div>
  );
}
