import {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { createRoot, Root } from "react-dom/client";
import {
  AiFillInfoCircle,
  AiFillCloseCircle,
  AiFillWarning,
  AiFillCheckCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { SnackbarConfigType } from "@minus-ui/types";
import { convertCloseTime } from "./utils";
import SnackbarWrapper from "./SnackbarWrapper";

interface Props extends SnackbarConfigType {
  index: number;
  idNum: number;
}
export function Snackbar(props: Props) {
  const {
    index,
    idNum,
    message,
    snackbarPosition = "top",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    manualClose = () => {},
    ...rest
  } = props;

  const [unmountClass, setUnmountClass] = useState<string>("");
  const [snackbarHeight, setSnackbarHeight] = useState<number>(0); // height 상태 추가
  const snackbarRef = useRef<HTMLDivElement>(null); // ref 추가
  const unmountMinTime = useMemo(() => {
    //최소값 1000ms
    return Math.max(2000, convertCloseTime(autoCloseTime));
  }, [autoCloseTime]);

  useEffect(() => {
    if (!autoClose) {
      return;
    }
    setTimeout(() => {
      setUnmountClass(" unmount");
    }, unmountMinTime);
  }, [autoClose, autoCloseTime, unmountMinTime]);

  useLayoutEffect(() => {
    if (snackbarRef.current) {
      setSnackbarHeight(snackbarRef.current.offsetHeight); // 렌더 후 height 값을 설정
    }
  }, []);

  return createPortal(
    <div
      ref={snackbarRef}
      className={`snackbar ${snackbarPosition}${unmountClass}`}
      style={
        {
          "--snackbar-vertical": snackbarHeight * 1.5 * index,
          "--snackbar-time": `${unmountMinTime / 2}ms`,
          ...rest,
        } as CSSProperties
      }
    >
      {!autoClose && (
        <AiOutlineClose
          className="close"
          onClick={() => {
            setUnmountClass(" unmount");
            setTimeout(() => {
              manualClose(idNum);
            }, 500 * 0.65);
          }}
        />
      )}
      {!!icons && icons}
      <span>{message}</span>
    </div>,
    document.getElementById("snackbar-root") as HTMLElement,
  );
}

let snackbarRoot: Root | null = null;
const getSnackbarRoot = () => {
  let container = document.getElementById("snackbar-root");

  // root 컨테이너 없으면 새로 생성
  if (!container) {
    container = document.createElement("div");
    container.id = "snackbar-root";
    document.body.appendChild(container);
  }
  // 없으면 새 root 생성
  if (!snackbarRoot) {
    snackbarRoot = createRoot(container);
  }
  return snackbarRoot;
};

const safeUnmountSnackbar = () => {
  //이벤트 루프를 다음으로 넘기기 위한 setTimeout 설정
  setTimeout(() => {
    if (snackbarRoot) {
      snackbarRoot.unmount(); // React Root 언마운트
      snackbarRoot = null;
    }
    const container = document.getElementById("snackbar-root");
    if (container) {
      container.remove();
    }
  }, 0);
};

Snackbar.show = async (config: SnackbarConfigType) => {
  const {
    message = "It's snack bar",
    snackbarPosition = "top",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    ...rest
  } = config;
  const snackbarRoot = getSnackbarRoot();
  const idNum = Date.now();
  await new Promise(() => {
    return snackbarRoot.render(
      <SnackbarWrapper
        status="show"
        idNum={idNum}
        message={message}
        snackbarPosition={snackbarPosition}
        icons={icons}
        autoClose={autoClose}
        autoCloseTime={autoCloseTime}
        {...rest}
      />,
    );
  });
};
Snackbar.info = async (config: SnackbarConfigType) => {
  const {
    message = "It's snack bar",
    snackbarPosition = "top",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    ...rest
  } = config;
  const snackbarRoot = getSnackbarRoot();
  const idNum = Date.now();
  await new Promise(() => {
    return snackbarRoot.render(
      <SnackbarWrapper
        status="info"
        idNum={idNum}
        message={message}
        snackbarPosition={snackbarPosition}
        icons={icons || <AiFillInfoCircle />}
        autoClose={autoClose}
        autoCloseTime={autoCloseTime}
        {...rest}
      />,
    );
  });
};
Snackbar.success = async (config: SnackbarConfigType) => {
  const {
    message = "It's snack bar",
    snackbarPosition = "top",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    ...rest
  } = config;
  const snackbarRoot = getSnackbarRoot();
  const idNum = Date.now();
  await new Promise(() => {
    return snackbarRoot.render(
      <SnackbarWrapper
        status="success"
        idNum={idNum}
        message={message}
        snackbarPosition={snackbarPosition}
        icons={icons || <AiFillCheckCircle />}
        autoClose={autoClose}
        autoCloseTime={autoCloseTime}
        {...rest}
      />,
    );
  });
};
Snackbar.warning = async (config: SnackbarConfigType) => {
  const {
    message = "It's snack bar",
    snackbarPosition = "top",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    ...rest
  } = config;
  const snackbarRoot = getSnackbarRoot();
  const idNum = Date.now();
  await new Promise(() => {
    return snackbarRoot.render(
      <SnackbarWrapper
        status="warning"
        idNum={idNum}
        message={message}
        snackbarPosition={snackbarPosition}
        icons={icons || <AiFillWarning />}
        autoClose={autoClose}
        autoCloseTime={autoCloseTime}
        {...rest}
      />,
    );
  });
};
Snackbar.error = async (config: SnackbarConfigType) => {
  const {
    message = "It's snack bar",
    snackbarPosition = "top",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    ...rest
  } = config;
  const snackbarRoot = getSnackbarRoot();
  const idNum = Date.now();
  await new Promise(() => {
    return snackbarRoot.render(
      <SnackbarWrapper
        status="error"
        idNum={idNum}
        message={message}
        snackbarPosition={snackbarPosition}
        icons={icons || <AiFillCloseCircle />}
        autoClose={autoClose}
        autoCloseTime={autoCloseTime}
        {...rest}
      />,
    );
  });
};

Snackbar.unmount = () => {
  safeUnmountSnackbar();
};
