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

import SnackbarWrapper from "./SnackbarWrapper";
import { SnackbarConfigType, SnackbarType } from "../../types";
import {
  convertCloseTime,
  getSnacbarPositionClassName,
  getSnackbarTypeClassName,
} from "./utils";
import { cn } from "../utils";

/**
 * 
 * Snackbar 알림 기능
 * 
 *  Snackbar.show({ message: 'snackbar!', ...}) 의 형식으로 사용
 * 
 * @param message - 안에 출력될 내용 (required)
 * @param className - snackbar class (optional)
 * @param type - snackbar 기본 제공 style type (optional)(success, error, warning, info)
 * @param snackbarPosition - snackbar 표출 위치 (optional)("top"
  | "bottom"
  | "left-top"
  | "left-bottom"
  | "right-top"
  | "right-bottom";)
 * @param maxCount - 한번에 표출될 snackbar 개수 (optional)
 * @param icons - snackbar 앞에 나올 아이콘 (optional)
 * @param autoClose - snackbar 자동 닫힘 여부 (optional)
 * @param autoCloseTime - snackbar 표출 시간 (optional)(auto close일때, s 혹은 ms 단위로 사용)
 * @param manualClose - snackbar 수동 닫기 시 닫을때 발생하는 함수 (optional)(autoclose가 아닐때 사용)
 * @returns 
 */
export function Snackbar(props: SnackbarType) {
  const {
    index,
    type = "success",
    idNum,
    className,
    message,
    snackbarPosition = "top",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    manualClose = () => {},
    ...rest
  } = props;
  const [unmountClass, setUnmountClass] = useState<string>("");
  const [snackbarHeight, setSnackbarHeight] = useState<number>(0);

  const snackbarRef = useRef<HTMLDivElement>(null);

  const unmountMinTime = useMemo(() => {
    //최소값 1000ms
    return Math.max(2000, convertCloseTime(autoCloseTime));
  }, [autoCloseTime]);
  const autoCloseClassName = autoClose ? "" : "cursor-pointer";

  const snackbarUnmountAnimateClassName = useMemo(() => {
    return snackbarPosition.includes("top")
      ? "animate-hideSnackbarOnTop"
      : "animate-hideSnackbarOnBottom";
  }, [snackbarPosition]);
  const snackbarPositionClassName =
    getSnacbarPositionClassName(snackbarPosition);
  const snackbarTypeClassName = getSnackbarTypeClassName(type);

  useEffect(() => {
    if (!autoClose) {
      return;
    }
    setTimeout(() => {
      setUnmountClass(snackbarUnmountAnimateClassName);
    }, unmountMinTime);
  }, [
    autoClose,
    autoCloseTime,
    unmountMinTime,
    snackbarUnmountAnimateClassName,
  ]);

  useLayoutEffect(() => {
    if (snackbarRef.current) {
      setSnackbarHeight(snackbarRef.current.offsetHeight); // 렌더 후 height 값을 설정
    }
  }, []);

  const snackbarClass = cn(
    "fixed pt-1 pb-2 px-3 flex items-center justify-center min-w-[150px] max-w-[500px] bg-inherit shadow-2xl text-inherit break-all",
    snackbarTypeClassName,
    autoCloseClassName,
    snackbarPositionClassName,
    unmountClass,
    className,
  );

  return createPortal(
    <div
      ref={snackbarRef}
      className={`${snackbarClass}`}
      style={
        {
          "--snackbar-vertical": snackbarHeight * 1.5 * index,
          "--snackbar-time": `${unmountMinTime / 2}ms`,
          ...rest,
        } as CSSProperties
      }
      onClick={() => {
        if (autoClose) {
          return;
        }
        setUnmountClass(snackbarUnmountAnimateClassName);
        setTimeout(() => {
          manualClose(idNum);
        }, 500 * 0.65);
      }}
    >
      {!!icons && icons}
      <span className="transition-[top]">{message}</span>
    </div>,
    document.getElementById("snackbar-root") as HTMLElement,
  );
}

let snackbarRoot: Root | null = null;

const getSnackbarRoot = () => {
  let container = document.getElementById("snackbar-root");

  // root 컨테이너 없으면 새로 생성
  if (!document.getElementById("snackbar-style")) {
    const style = document.createElement("style");
    style.id = "snackbar-style";
    style.textContent = `
  .animate-showSnackbarOnTop {
    animation: showSnackbarOnTop 0.5s forwards;
  }
  .animate-showSnackbarOnBottom {
    animation: showSnackbarOnBottom 0.5s forwards;
  }
  .animate-hideSnackbarOnTop {
    animation: hideSnackbarOnTop 0.5s forwards;
  }
  .animate-hideSnackbarOnBottom {
    animation: hideSnackbarOnBottom 0.5s forwards;
  }
  @keyframes showSnackbarOnTop {
    0% { opacity: 0; transform: translate(-50%, 0); }
    100% { opacity: 1; transform: translate(-50%, 20px); }
  }
  @keyframes hideSnackbarOnTop {
    0% { opacity: 1; transform: translate(-50%, 20px); }
    100% { opacity: 0; transform: translate(-50%, 0); }
  }
  @keyframes showSnackbarOnBottom {
    0% { opacity: 0; transform: translate(-50%, 0); }
    100% { opacity: 1; transform: translate(-50%, -20px); }
  }
  @keyframes hideSnackbarOnBottom {
    0% { opacity: 1; transform: translate(-50%, -20px); }
    100% { opacity: 0; transform: translate(-50%, 0); }
  }
  `;
    document.head.appendChild(style); // head에 직접 붙이기도 가능
  }
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
  //render 중 unmount시에 이벤트 루프를 한단계 미룸
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
Snackbar.show = (config: SnackbarConfigType) => {
  const {
    message = "It's snack bar",
    snackbarPosition = "top",
    type = "success",
    icons = "",
    autoClose = true,
    autoCloseTime = "2s",
    ...rest
  } = config;
  const snackbarRoot = getSnackbarRoot();
  const idNum = Date.now();
  return snackbarRoot.render(
    <SnackbarWrapper
      type={type}
      idNum={idNum}
      message={message}
      snackbarPosition={snackbarPosition}
      icons={icons}
      autoClose={autoClose}
      autoCloseTime={autoCloseTime}
      unmount={safeUnmountSnackbar}
      root={snackbarRoot}
      {...rest}
    />,
  );
};

Snackbar.unmount = () => {
  safeUnmountSnackbar();
};
