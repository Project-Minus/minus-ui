import { ReactNode, useEffect, useMemo, useState } from "react";
import { SnackbarConfigType, SnackbarStatusType } from "@minus-ui/types";
import { convertCloseTime } from "./utils";
import { SNCMBAR_DEFAULT_STYLE } from "./utils";
import { Snackbar } from "./Snackbar";

interface SnackbarItem {
  id: number;
  status: SnackbarStatusType;
  message: ReactNode;
  icons: ReactNode;
}

interface Props extends SnackbarConfigType {
  idNum: number;
}
export default function SnackbarWrapper(props: Props) {
  const {
    idNum,
    status = "show",
    message,
    snackbarPosition = "top",
    maxCount = Infinity,
    icons = "",
    autoClose = true,
    autoCloseTime = "1s",
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
          return [...prev, { id: idNum, status, icons, message }];
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
  }, [autoClose, idNum, maxCount, status, icons, message, unmountMinTime]);

  return (
    <div>
      {snackbars.map((snackbar, index) => {
        const {
          id,
          status,
          icons: snackbarIcon,
          message: snackbarMessage,
        } = snackbar;
        const getStyle = SNCMBAR_DEFAULT_STYLE[status];
        return (
          <Snackbar
            key={id}
            index={index}
            idNum={id}
            icons={snackbarIcon}
            message={snackbarMessage}
            autoClose={autoClose}
            autoCloseTime={autoCloseTime}
            snackbarPosition={snackbarPosition}
            manualClose={manualClose}
            {...getStyle}
            {...rest}
          />
        );
      })}
    </div>
  );
}
