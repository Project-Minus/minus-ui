import { CSSProperties, ReactNode } from "react";
import { Root } from "react-dom/client";

export type SnackbarPositionType =
  | "top"
  | "bottom"
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";

export type SnackbarThemeType = "success" | "error" | "warning" | "info";

export interface SnackbarConfigType extends CSSProperties {
  message: ReactNode;
  className?: string;
  type?: SnackbarThemeType;
  snackbarPosition?: SnackbarPositionType;
  maxCount?: number;
  icons?: ReactNode;
  autoClose?: boolean;
  autoCloseTime?: string;
  manualClose?: (idNum: number) => void;
  unmount?: () => void;
  root?: Root | null;
}

export interface SnackbarType
  extends Omit<SnackbarConfigType, "root" | "unmount"> {
  index: number;
  idNum: number;
}
