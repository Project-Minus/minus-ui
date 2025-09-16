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
      return `minus-ui-tooltip-content-top`;
    case "bottom":
      return `minus-ui-tooltip-content-bottom`;
    case "left":
      return `minus-ui-tooltip-content-left`;
    case "right":
      return `minus-ui-tooltip-content-right`;
    case "left-top":
      return `minus-ui-tooltip-content-left-top`;
    case "right-top":
      return `minus-ui-tooltip-content-right-top`;
    case "left-bottom":
      return `minus-ui-tooltip-content-left-bottom`;
    case "right-bottom":
      return `minus-ui-tooltip-content-right-bottom`;
    default:
      return `minus-ui-tooltip-content-top`;
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
  isTail?: boolean,
) => {
  //위치 보정치
  const HORIZONTAL_CORRECTION = 14;
  const VERTICAL_CORRECTION = 12;
  const MULTIPLE_HORIZONTAL_CORRECTION = 20;
  const hasTailCorrection = isTail ? 0 : 4;
  if (!parentWidth || !parentHeight || !childWidth || !childHeight) {
    return {};
  }
  if (parentWidth && parentHeight && childWidth && childHeight) {
    switch (position) {
      case "top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION - hasTailCorrection,
          left: parentWidth / 2 - childWidth / 2,
        };
      case "bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION - hasTailCorrection,
          left: parentWidth / 2 - childWidth / 2,
        };
      case "left":
        return {
          top: parentHeight / 2 - childHeight / 2,
          right: parentWidth + HORIZONTAL_CORRECTION - hasTailCorrection,
        };
      case "right":
        return {
          top: parentHeight / 2 - childHeight / 2,
          left: parentWidth + HORIZONTAL_CORRECTION - hasTailCorrection,
        };
      case "left-top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION - hasTailCorrection,
          right: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      case "right-top":
        return {
          bottom: parentHeight + VERTICAL_CORRECTION - hasTailCorrection,
          left: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      case "left-bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION - hasTailCorrection,
          right: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      case "right-bottom":
        return {
          top: parentHeight + VERTICAL_CORRECTION - hasTailCorrection,
          left: parentWidth - parentWidth / 5 - MULTIPLE_HORIZONTAL_CORRECTION,
        };
      default:
        return {
          bottom: parentHeight + VERTICAL_CORRECTION - hasTailCorrection,
          left: parentWidth / 2 - childWidth / 2,
        };
    }
  }
  return {};
};
