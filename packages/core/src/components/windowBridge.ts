/* eslint-disable @typescript-eslint/no-explicit-any */

import { Root } from "react-dom/client";

export const ROUTER_CHANGE_EVENT_WITH_SNACKBAR = "rounterChangeWithSnackbar";
export const ROUTER_CHANGE_EVENT_WITH_IMAGE_VIEWER =
  "routerChangeWithImageViewer";
export const ROUTER_CHANGE_FLAG_WITH_SNACKBAR = "__routeChangeWithSnackbar__";
export const ROUTER_CHANGE_FLAG_WITH_IMAGE_VIEWER =
  "__routeChangeWithImageViewer__";

declare global {
  interface Window {
    __routeChangeWithSnackbar__?: boolean;
    __routeChangeWithImageViewer__?: boolean;
  }
}

type RouteFlagKey =
  | "__routeChangeWithSnackbar__"
  | "__routeChangeWithImageViewer__";

function dispatchEvent(eventName: string) {
  window.dispatchEvent(new Event(eventName));
}

export const windowLocationBridge = (
  root: Root | null,
  eventName: string,
  eventFlag: RouteFlagKey,
  unmount: () => void,
) => {
  const eventWithUnmount = () => {
    if (root) {
      dispatchEvent(eventName);
      unmount();
    }
  };

  window.addEventListener("popstate", eventWithUnmount);

  if (!window[eventFlag]) {
    window[eventFlag] = true;

    const origPush = history.pushState;
    history.pushState = function (...args) {
      const ret = origPush.apply(this, args as any);
      eventWithUnmount();
      return ret;
    };

    const origReplace = history.replaceState;
    history.replaceState = function (...args) {
      const ret = origReplace.apply(this, args as any);
      eventWithUnmount();
      return ret;
    };
  }

  return () => {
    window.removeEventListener("popstate", eventWithUnmount);
  };
};
