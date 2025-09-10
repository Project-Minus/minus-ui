import { useCallback, useEffect, useRef } from "react";

export default function useBodyScrollLock(maintainLayout: boolean = true) {
  const isScroll =
    typeof window !== "undefined"
      ? window.innerHeight !== document.body.scrollHeight
      : false;
  const scrollRef = useRef<number>(0);
  const lockScroll = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const { scrollY } = window;
    const scorllValue = scrollY || scrollRef.current;
    document.body.style.position = "fixed";
    document.body.style.overflowY = isScroll ? "scroll" : "auto";
    document.body.style.top = maintainLayout ? `-${scorllValue}px` : "";
    document.body.style.width = "100%";
  }, [maintainLayout, isScroll]);

  // 모달이 닫혔을 때 스크롤을 활성화 한다.
  const openScroll = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const topPosition = parseInt(document.body.style.top || "0", 10) * -1;
    const { scrollY } = window;
    const scroll = topPosition || scrollY;

    document.body.style.position = "";
    document.body.style.overflowY = "";
    document.body.style.top = "";
    document.body.style.width = "";
    if (maintainLayout) {
      window.scrollTo(0, parseInt(String(scroll) || "0", 10) * 1);
    }
  }, [maintainLayout]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    scrollRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.scrollTo(0, 0);
  }, []);

  return { lockScroll, openScroll };
}
