import getScrollInfo from "./getScrollInfo";

type getIsAtThresholdParams = {
  isAxisX: boolean,
  useWindow: boolean,
  threshold: number,
  containerRef: React.RefObject<HTMLDivElement>,
  reverseDirection: boolean
}

type getIsAtThresholdResult = boolean

const getIsAtThreshold = ({
  isAxisX,
  useWindow,
  threshold,
  containerRef,
  reverseDirection,
}: getIsAtThresholdParams): getIsAtThresholdResult  => {
  if (reverseDirection) {
    const { scrolledLength } = getScrollInfo({
      useWindow,
      isAxisX,
      containerRef,
    });

    return scrolledLength - threshold <= 0;
  }

  const { containerLength, scrolledLength, totalScrollLength } = getScrollInfo({
    useWindow,
    isAxisX,
    containerRef,
  });

  return containerLength + scrolledLength + threshold >= totalScrollLength;
};

export default getIsAtThreshold;
