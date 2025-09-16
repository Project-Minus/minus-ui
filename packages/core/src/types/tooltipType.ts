import { PropsWithChildren, ReactNode } from "react";
export type TooltipPositionType =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";

export interface TooltipPropsType extends PropsWithChildren {
  contents: ReactNode;
  position?: TooltipPositionType;
  isTail?: boolean;
  isShowBubble?: boolean;
  isDraggable?: boolean;
  backgroundColor?: string;
  containerClassName?: string;
  contentClassName?: string;
}
