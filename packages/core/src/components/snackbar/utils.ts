import { SnackbarPositionType } from "@minus-ui/types";
import { SnackbarThemeType } from "../../types";

export const convertCloseTime = (autoCloseTime: string) => {
  if (autoCloseTime.endsWith("ms")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]);
  }
  if (autoCloseTime.endsWith("s")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]) * 1000;
  }
  return 2000;
};

export const getSnacbarPositionClassName = (position: SnackbarPositionType) => {
  const top = `top-[calc(60px+1px*var(--snackbar-vertical)))]`;
  const bottom = `bottom-[calc(60px+1px*var(--snackbar-vertical)))]`;
  switch (position) {
    case "top":
      return `${top} left-[50%] translate-y-[-50%] transition-[top] animate-showSnackbarOnTop`;
    case "left-top":
      return `${top} left-[10%] translate-y-[-50%] translate-x-[50%] transition-[top] animate-showSnackbarOnTop`;
    case "right-top":
      return `${top} right-[10%] translate-y-[-50%] translate-x-[-50%] transition-[top] animate-showSnackbarOnTop`;
    case "bottom":
      return `${bottom} left-[50%] translate-y-[-50%] transition-[bottom] animate-showSnackbarOnBottom`;
    case "left-bottom":
      return `${bottom} left-[10%] translate-y-[-50%] translate-x-[50%] transition-[bottom] animate-showSnackbarOnBottom`;
    case "right-bottom":
      return `${bottom} right-[10%] translate-y-[-50%] translate-x-[50%] transition-[bottom] animate-showSnackbarOnBottom`;
    default:
      return `${top} left-[50%] translate-x-[-50%] transition-[top] animate-showSnackbarOnTop`;
  }
};

export const getSnackbarTypeClassName = (type: SnackbarThemeType) => {
  switch (type) {
    case "success":
      return `bg-[#274126] text-[#b1fdaa] rounded-[5px]`;
    case "error":
      return `bg-[#4E3534] text-[#FFDACC] rounded-[5px]`;
    case "warning":
      return `bg-[#413C26] text-[#FDF3AA] rounded-[5px]`;
    case "info":
      return `bg-[#262641] text-[#c1c5fd] rounded-[5px]`;

    default:
      return `bg-green-600 text-green-100 rounded-[5px]`;
  }
};
