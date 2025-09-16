import {
  CSSProperties,
  useState,
  useRef,
  ReactNode,
  MouseEvent,
  useEffect,
} from "react";
import { cn } from "../utils";
import {
  getCalcBubblePosition,
  getDraggableClassName,
  getTailClassName,
} from "./utils";
import { TooltipPositionType } from "../../types";

interface Props {
  contents: ReactNode;
  position?: TooltipPositionType;
  isTail?: boolean;
  isDraggable?: boolean;
  parentDimension: { width: number; height: number };
  backgroundColor: string;
  contentClassName: string;
}
export default function TooltipBubble(props: Props) {
  const {
    contents,
    position = "top",
    isTail = true,
    isDraggable = false,
    parentDimension,
    backgroundColor,
    contentClassName,
  } = props;
  const [positionStyle, setPositionStyle] = useState<CSSProperties | null>(
    null,
  );
  const bubbleRef = useRef<HTMLDivElement>(null);
  const childWidth = bubbleRef?.current?.clientWidth;
  const childHeight = bubbleRef?.current?.clientHeight;
  const draggableClassName = getDraggableClassName(isDraggable, position);
  const tailClassName = getTailClassName(isTail, position);
  const bubbleClass = cn(
    "minus-ui-tooltip-content",
    contentClassName,
    tailClassName,
    "minus-ui-tooltip-content-default",
    draggableClassName,
  );

  const currentPositionStyle = positionStyle
    ? { ...positionStyle }
    : { opacity: 0 };

  const preventEvent = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const parentWidth = parentDimension.width;
    const parentHeight = parentDimension.height;
    if (!childWidth || !childHeight) {
      return;
    }
    setPositionStyle(
      getCalcBubblePosition(
        position,
        parentWidth,
        parentHeight,
        childWidth,
        childHeight,
      ),
    );
  }, [position, parentDimension, childWidth, childHeight]);

  return (
    <div
      onClick={preventEvent}
      ref={bubbleRef}
      style={
        {
          ...currentPositionStyle,
          backgroundColor,
          "--tooltip-bg": backgroundColor,
        } as CSSProperties
      }
      className={bubbleClass}
    >
      <div className="z-2 relative">{contents}</div>
    </div>
  );
}
