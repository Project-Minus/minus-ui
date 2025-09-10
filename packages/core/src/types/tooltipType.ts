import { ReactNode } from "react";
import { CSSProperties } from "react";
export type TooltipPositionType =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";

export interface TooltipPropsType {
  contents: ReactNode;
  bubbleContents: ReactNode | string;
  position?: TooltipPositionType;
  textColor?: string;
  backgroundColor?: string;
  size?: string;
  isTail?: boolean;
  isShowBubble?: boolean;
  isDraggable?: boolean;
  checkOverflow?: boolean;
  boxStyle?: CSSProperties;
  boxContentStyle?: CSSProperties;
}
