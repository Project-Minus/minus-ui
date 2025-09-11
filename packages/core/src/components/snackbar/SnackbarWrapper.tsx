import { ReactNode, useEffect, useMemo, useState } from "react";
import { convertCloseTime } from "./utils";
import { Snackbar } from "./Snackbar";
import { SnackbarConfigType, SnackbarThemeType } from "../../types";
import {
  ROUTER_CHANGE_EVENT_WITH_SNACKBAR,
  ROUTER_CHANGE_FLAG_WITH_SNACKBAR,
  windowLocationBridge,
} from "../windowBridge";

interface SnackbarItem {
  id: number;
  type: SnackbarThemeType;
  message: ReactNode;
  icons: ReactNode;
}

interface Props extends SnackbarConfigType {
  idNum: number;
}

export default function SnackbarWrapper(props: Props) {
  const {
    idNum,
    type = "success",
    message,
    snackbarPosition = "top",
    maxCount = Infinity,
    icons = "",
    autoClose = true,
    autoCloseTime = "1s",
    unmount = () => {},
    root,
    ...rest
  } = props;
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const unmountMinTime = useMemo(() => {
    //최소값 500ms
    return Math.max(500, convertCloseTime(autoCloseTime));
  }, [autoCloseTime]);

  const manualClose = (idNum: number) => {
    setSnackbars((prev) => prev.filter((snack) => snack.id !== idNum));
  };

  useEffect(() => {
    const handleShowSnackbar = () => {
      setSnackbars((prev) => {
        if (prev.length < maxCount) {
          return [...prev, { id: idNum, type, icons, message }];
        }
        return [...prev];
      });
      setTimeout(() => {
        if (!autoClose) {
          return;
        }
        setSnackbars((prev) => prev.filter((snack) => snack.id !== idNum));
      }, unmountMinTime * 1.3);
    };
    handleShowSnackbar();
  }, [autoClose, idNum, maxCount, type, icons, message, unmountMinTime]);

  useEffect(() => {
    windowLocationBridge(
      root ?? null,
      ROUTER_CHANGE_EVENT_WITH_SNACKBAR,
      ROUTER_CHANGE_FLAG_WITH_SNACKBAR,
      unmount,
    );
  }, [unmount]);

  if (snackbars.length < 1) {
    return;
  }

  return (
    <div>
      {snackbars.map((snackbar, index) => {
        const {
          id,
          icons: snackbarIcon,
          message: snackbarMessage,
          type,
        } = snackbar;
        return (
          <Snackbar
            key={id}
            index={index}
            idNum={id}
            type={type}
            icons={snackbarIcon}
            message={snackbarMessage}
            autoClose={autoClose}
            autoCloseTime={autoCloseTime}
            snackbarPosition={snackbarPosition}
            manualClose={manualClose}
            {...rest}
          />
        );
      })}
    </div>
  );
}
