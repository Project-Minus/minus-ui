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
  getBlockClassNameWithPos,
  getSnacbarPositionClassName,
  getSnackbarTypeClassName,
} from "./utils";
import { cn } from "../utils";

/**
 * Snackbar 알림을 화면에 표시합니다.
 *
 * 사용 목적:
 * - 짧은 상태 알림(성공/오류/경고/정보)을 화면 가장자리(위/아래/좌·우 상하)에 토스트 형태로 노출.
 * - 자동 닫힘(autoclose) 또는 수동 닫기 콜백을 지원.
 * - 동시에 표시될 개수 제한(maxCount)과 아이콘 커스터마이즈를 지원.
 *
 * @example
 * // 기본 사용
 * Snackbar.show({ message: "snackbar!" });
 *
 * @param {Object} options - 스낵바 옵션
 * @param {string | React.ReactNode} options.message - 스낵바에 표시할 내용 **(required)**
 * @param {string} [options.className] - 스낵바 컨테이너에 추가할 CSS 클래스(예: Tailwind 유틸)
 * @param {"success"|"error"|"warning"|"info"} [options.type] - 기본 제공 스타일 타입
 * @param {"top"|"bottom"|"left-top"|"left-bottom"|"right-top"|"right-bottom"} [options.snackbarPosition]
 *   스낵바 표시 위치
 * @param {number} [options.maxCount]
 *   동시에 표시 가능한 최대 개수(초과 시 가장 오래된 항목 제거 또는 큐잉은 구현에 따름)
 * @param {React.ReactNode} [options.icons]
 *   메시지 앞에 표시할 아이콘(컴포넌트/노드)
 * @param {boolean} [options.autoClose]
 *   자동으로 닫힐지 여부
 * @param {string} [options.autoCloseTime]
 *   자동 닫힘 시간. `"2s"`, `"1500ms"` 형식으로 작성
 * @param {() => void} [options.manualClose]
 *   수동 닫기(사용자 클릭 등) 시 호출되는 콜백. `autoClose: false`일 때 사용
 * @returns {JSX.Element}
 */
export function Snackbar(props: SnackbarType) {
  const {
    index,
    type = "success",
    idNum,
    className = "",
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
    return Math.max(1000, convertCloseTime(autoCloseTime));
  }, [autoCloseTime]);
  const posBlockClassName = getBlockClassNameWithPos(className);

  const snackbarTypeClassName = getSnackbarTypeClassName(type);

  const snackbarPositionClassName =
    getSnacbarPositionClassName(snackbarPosition);

  const autoCloseClassName = autoClose
    ? ""
    : "minus-ui-snackbar-auto-close-off";

  const snackbarUnmountAnimateClassName = useMemo(() => {
    return snackbarPosition.includes("top")
      ? "minus-ui-snackbar-unmount-on-top"
      : "minus-ui-snackbar-unmount-on-bottom";
  }, [snackbarPosition]);

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
    "minus-ui-snackbar",
    snackbarTypeClassName,
    posBlockClassName,
    autoCloseClassName,
    unmountClass,
    snackbarPositionClassName,
  );

  return createPortal(
    <div
      ref={snackbarRef}
      className={snackbarClass}
      style={
        {
          "--snackbar-vertical": snackbarHeight * index + index * 12,
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
