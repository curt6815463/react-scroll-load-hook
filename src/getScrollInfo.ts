
type getScrollInfoParams = {
  useWindow: boolean,
  isAxisX: boolean,
  containerRef: React.RefObject<HTMLDivElement>,
}

type getScrollInfoReturn = {
  containerLength: number, 
  scrolledLength: number
  totalScrollLength: number
}

const getScrollInfo = ({ useWindow, isAxisX, containerRef }: getScrollInfoParams) : getScrollInfoReturn => {
  let containerLength;
  let scrolledLength;
  let totalScrollLength;

  if (useWindow) {
    containerLength = isAxisX ? window.innerWidth : window.innerHeight;
    scrolledLength = isAxisX ? window.scrollX : window.scrollY;
    totalScrollLength = isAxisX
      ? document.body.offsetWidth
      : document.body.offsetHeight;
    return { containerLength, scrolledLength, totalScrollLength };
  }

  const element = containerRef?.current;
  if(element){
    containerLength = isAxisX ? element.clientWidth : element.clientHeight;
    scrolledLength = isAxisX ? element.scrollLeft : element.scrollTop;
    totalScrollLength = isAxisX ? element.scrollWidth : element.scrollHeight;
    return { containerLength, scrolledLength, totalScrollLength };
  }

  return { containerLength: 0, scrolledLength: 0, totalScrollLength: 0 }
};

export default getScrollInfo;
