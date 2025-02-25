import { CSSProperties, ReactNode } from "react";

export type SnackbarPositionType =
  | "top"
  | "bottom"
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";

export type SnackbarStatusType =
  | "show"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface SnackbarConfigType extends CSSProperties {
  message: ReactNode;
  status?: SnackbarStatusType;
  snackbarPosition?: SnackbarPositionType;
  maxCount?: number;
  icons?: ReactNode;
  autoClose?: boolean;
  autoCloseTime?: string;
  manualClose?: (idNum: number) => void;
}
