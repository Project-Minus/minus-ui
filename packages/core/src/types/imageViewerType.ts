import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ImageViewerConfig {
  url: string;
  onMount?: (prop?: any) => void;
  onUnMount?: (prop?: any) => void;
  isShowPanel?: boolean;
  containerClassName?: string;
  viewerClassName?: string;
  imageClassName?: string;
  panelClassName?: string;
  icons?: {
    flipUp: ReactNode;
    flipDown: ReactNode;
    rotateLeft: ReactNode;
    rotateRight: ReactNode;
    zoomIn: ReactNode;
    zoomOut: ReactNode;
  };
}
