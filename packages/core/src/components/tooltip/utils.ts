import { TooltipPositionType } from "../../types";

export const getDraggableClassName = (
  isDraggable: boolean,
  postion: TooltipPositionType,
) => {
  if (!isDraggable) {
    return "minus-ui-tooltip-non-draggable";
  }
  if (postion.includes("top") || postion.includes("bottom")) {
    return "minus-ui-tooltip-draggable minus-ui-tooltip-draggable-vertical";
  }
  if (postion === "left") {
    return "minus-ui-tooltip-draggable minus-ui-tooltip-draggable-left";
  }
  return "minus-ui-tooltip-draggable minus-ui-tooltip-draggable-right";
};

export const getTailClassName = (
  isTail: boolean,
  position: TooltipPositionType,
) => {
  if (!isTail) {
    return "";
  }
  switch (position) {
    case "top":
      return `after:absolute after:conntent-[""] after:left-[50%] after:bottom-[-6px] after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-t-[12px] after:border-t-[var(--tooltip-bg)] after:translate-x-[-50%]`;
    case "bottom":
      return `after:absolute after:conntent-[""] after:left-[50%] after:top-[-6px] after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-b-[12px] after:border-b-[var(--tooltip-bg)] after:translate-x-[-50%]`;
    case "left":
      return `after:absolute after:conntent-[""] after:right-[-6px] after:top-[50%] after:border-t-[9px] after:border-t-transparent after:border-b-[9px] after:border-b-transparent after:border-l-[12px] after:border-l-[var(--tooltip-bg)] after:translate-y-[-50%]`;
    case "right":
      return `after:absolute after:conntent-[""] after:left-[-6px] after:top-[50%] after:border-t-[9px] after:border-t-transparent after:border-b-[9px] after:border-b-transparent after:border-r-[12px] after:border-r-[var(--tooltip-bg)] after:translate-y-[-50%]`;
    case "left-top":
      return `after:absolute after:conntent-[""] after:right-[10px] after:top-[100%] after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-t-[12px] after:border-t-[var(--tooltip-bg)] after:translate-y-[-50%]`;
    case "right-top":
      return `after:absolute after:conntent-[""] after:left-[10px] after:top-[100%] after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-t-[12px] after:border-t-[var(--tooltip-bg)] after:translate-y-[-50%]`;
    case "left-bottom":
      return `after:absolute after:conntent-[""] after:right-[10px] after:top-0 after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-b-[12px] after:border-b-[var(--tooltip-bg)] after:translate-y-[-50%]`;
    case "right-bottom":
      return `after:absolute after:conntent-[""] after:left-[10px] after:top-0 after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-b-[12px] after:border-b-[var(--tooltip-bg)] after:translate-y-[-50%]`;
    default:
      return 'after:absolute after:conntent-[""] after:left-[50%] after:bottom-[-6px] after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-t-[12px] after:border-t-[var(--tooltip-bg)] after:translate-x-[-50%]';
  }
};

export const getCalcBubblePosition = (
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
  const HORIZONTAL_CORRECTION = 14;
  const VERTICAL_CORRECTION = 12;
  const MULTIPLE_HORIZONTAL_CORRECTION = 20;
  if (!parentWidth || !parentHeight || !childWidth || !childHeight) {
    return {};
  }
  if (parentWidth && parentHeight && childWidth && childHeight) {
    switch (position) {
      case "top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2,
        };
      case "bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2,
        };
      case "left":
        return {
          top: parentHeight / 2 - childHeight / 2,
          right: parentWidth + HORIZONTAL_CORRECTION,
        };
      case "right":
        return {
          top: parentHeight / 2 - childHeight / 2,
          left: parentWidth + HORIZONTAL_CORRECTION,
        };
      case "left-top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          right: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      case "right-top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      case "left-bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION,
          right: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      case "right-bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      default:
        return {
          bottom: parentHeight + VERTICAL_CORRECTION,
          left: parentWidth / 2 - childWidth / 2,
        };
    }
  }
  return {};
};
