import { useCallback, useEffect, useRef } from "react";
import getIsAtThreshold from "./getIsAtThreshold";

enum Axis {
  x = 'x',
  y = 'y',
}
 
type useInfiniteScrollerParams = {
  onLoadMore: () => void,
  isLoading: boolean,
  hasMore: boolean,
  threshold?: number,
  axis?: Axis,
  useWindow?: boolean,
  reverseDirection?: boolean
}

type useInfiniteScrollerReturn = {
  containerRef: React.RefObject<HTMLDivElement>
}

const useInfiniteScroller = ({
  onLoadMore,
  isLoading,
  hasMore,
  threshold = 100,
  axis = Axis.y,
  useWindow = false,
  reverseDirection = false,
}: useInfiniteScrollerParams) : useInfiniteScrollerReturn => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollListener = useCallback(() => {
    if (
      getIsAtThreshold({
        isAxisX: axis === Axis.x,
        useWindow,
        threshold,
        containerRef,
        reverseDirection,
      })
    ) {
      onLoadMore();
      const scrollerElement = useWindow ? window : containerRef.current;
      scrollerElement?.removeEventListener("scroll", scrollListener);
    }
  }, [axis, onLoadMore, threshold, useWindow, reverseDirection]);

  useEffect(() => {
    const scrollerElement = useWindow ? window : containerRef.current;
    if (!isLoading && hasMore && scrollerElement) {
      scrollerElement.addEventListener("scroll", scrollListener);
      scrollListener();
    }
    return () => {
      scrollerElement?.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener, isLoading, hasMore, useWindow]);

  return { containerRef };
};

export default useInfiniteScroller;
