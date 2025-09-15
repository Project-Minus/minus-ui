import { SnackbarPositionType, SnackbarThemeType } from "../../types";

export const convertCloseTime = (autoCloseTime: string) => {
  if (autoCloseTime.endsWith("ms")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]);
  }
  if (autoCloseTime.endsWith("s")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]) * 1000;
  }
  return 2000;
};

export const getBlockClassNameWithPos = (className: string) => {
  const splitClassName = className?.split(" ");
  return splitClassName
    ?.filter((el) => !el.startsWith("top-") && !el.startsWith("bottom-"))
    .join(" ");
};

export const getSnacbarPositionClassName = (position: SnackbarPositionType) => {
  switch (position) {
    case "top":
      return `minus-ui-snackbar-top`;
    case "left-top":
      return `minus-ui-snackbar-left-top`;
    case "right-top":
      return `minus-ui-snackbar-right-top`;
    case "bottom":
      return `minus-ui-snackbar-bottom`;
    case "left-bottom":
      return `minus-ui-snackbar-left-bottom`;
    case "right-bottom":
      return `minus-ui-snackbar-right-bottom`;
    default:
      return `minus-ui-snackbar-top`;
  }
};

export const getSnackbarTypeClassName = (type: SnackbarThemeType) => {
  switch (type) {
    case "success":
      return `minus-ui-snackbar-success`;
    case "error":
      return `minus-ui-snackbar-error`;
    case "warning":
      return `minus-ui-snackbar-warning`;
    case "info":
      return `minus-ui-snackbar-info`;

    default:
      return `minus-ui-snackbar-success`;
  }
};
