import React, {
  useState,
  Children,
  useRef,
  useEffect,
  useLayoutEffect,
  PropsWithChildren,
  ReactElement,
} from 'react';

import ArrowIcon from '../../assets/images/arrow.svg';

import './styles.css';

export type CarouselProps = PropsWithChildren<{
  autoPlay?: boolean;
  gap?: number;
  delay?: number;
}>;

export const Carousel = ({
  children,
  autoPlay = false,
  gap = 0,
  delay = 3,
}: CarouselProps) => {
  const [width, setWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isStopped] = useState(!autoPlay);

  const dragStartPoint = useRef(0);
  const innerCarousel = useRef<HTMLDivElement>(null);
  const differencePointRef = useRef(0);

  const animationRef = useRef<number | null>(null);
  const animationDelayRef2 = useRef<number | undefined>(undefined);
  const debounceRef = useRef(0);

  useEffect(() => {
    window.addEventListener('resize', setSliderWidth);
    !isStopped &&
      animationRef.current &&
      (animationRef.current = window.requestAnimationFrame(handleAutoPlay));
    return () => {
      window.removeEventListener('resize', setSliderWidth);
      animationRef?.current &&
        window.cancelAnimationFrame(animationRef.current);
    };
  });

  useLayoutEffect(() => {
    if (innerCarousel?.current) {
      setWidth(innerCarousel?.current?.clientWidth);
    }
  }, []);

  const handleAutoPlay = () => {
    clearInterval(animationDelayRef2.current);
    animationDelayRef2.current = setTimeout(() => {
      handleMove('next');
      if (animationRef?.current) {
        window.cancelAnimationFrame(animationRef?.current);
        animationRef.current = window.requestAnimationFrame(handleAutoPlay);
      }
    }, delay * 1000);
  };

  const handleMove = (type = 'next') => {
    switch (type) {
      case 'next':
        if (activeIndex + 1 <= Children.count(children)) {
          setActiveIndex((prevState) => prevState + 1);
          setTrackWidth(width * activeIndex + gap * activeIndex);
        } else {
          setActiveIndex(1);
          setTrackWidth(0);
        }
        break;
      case 'prev':
        if (activeIndex - 1 > 0) {
          setActiveIndex((prevState) => prevState - 1);
          setTrackWidth(width * (activeIndex - 2) + gap * (activeIndex - 2));
        } else {
          setActiveIndex(Children.count(children));
          setTrackWidth(
            width * (Children.count(children) - 1) +
              gap * (Children.count(children) - 1)
          );
        }
        break;
      default:
        setActiveIndex(1);
        break;
    }
  };

  const handleSwipeStart = (points: number) => {
    // dragStartPoint.current = parseInt(points);
    dragStartPoint.current = points;
  };

  const handleSwipeMove = (points: number) => {
    if (
      differencePointRef.current !==
        // dragStartPoint.current - parseInt(points) &&
        dragStartPoint.current - points &&
      dragStartPoint.current !== 0
    ) {
      const movePoints =
        // dragStartPoint.current - parseInt(points) - differencePointRef.current;
        dragStartPoint.current - points - differencePointRef.current;

      // differencePointRef.current = dragStartPoint.current - parseInt(points);
      differencePointRef.current = dragStartPoint.current - points;

      setTrackWidth(trackWidth + movePoints + gap * activeIndex);
    }
  };

  const handleSwipeEnd = (points: number) => {
    if (dragStartPoint.current !== 0) {
      // const endPoint = parseInt(points);
      const endPoint = points;

      if (dragStartPoint.current - endPoint > 0) {
        handleMove('next');
      } else if (dragStartPoint.current - endPoint < 0) {
        handleMove('prev');
      }
    }

    dragStartPoint.current = 0;
    differencePointRef.current = 0;
  };

  // const handeAutoStop = () => {
  //   setIsStopped(true);
  //   clearInterval(animationDelayRef2.current);
  //   cancelAnimationFrame(animationRef.current);
  // };

  const setSliderWidth = () => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      console.log('Width' + width);
      console.log('Track width' + trackWidth);
      if (innerCarousel?.current?.clientWidth) {
        setWidth(innerCarousel?.current?.clientWidth);
      }
      if (trackWidth === 0 && activeIndex === 1) {
        return;
      }
      if (innerCarousel?.current?.clientWidth) {
        setTrackWidth(
          innerCarousel?.current?.clientWidth * (activeIndex - 1) +
            gap * (activeIndex - 1)
        );
      }

      // if (parseInt(innerCarousel.current.clientWidth) <= width) {
      // }
    }, 350);
  };

  return (
    <>
      <div className='container-carousel '>
        <img
          src={ArrowIcon}
          className='arrow'
          style={{ transform: 'rotate(90deg)' }}
          onClick={() => handleMove('prev')}
        />
        <div className='carousel'>
          <div
            className='inner-carousel'
            style={{
              transform: `translate3d(-${trackWidth}px, 0px, 0px)`,
              gap: `${gap}px`,
            }}
            ref={innerCarousel}
            onMouseDown={(event) => handleSwipeStart(event.clientX)}
            onMouseMove={(event) => handleSwipeMove(event.clientX)}
            onMouseUp={(event) => handleSwipeEnd(event.clientX)}
            onMouseOut={(event) => handleSwipeEnd(event.clientX)}
            onTouchStart={({ changedTouches }) =>
              handleSwipeStart(changedTouches[0].clientX)
            }
            onTouchMove={({ changedTouches }) =>
              handleSwipeMove(changedTouches[0].clientX)
            }
            onTouchEnd={({ changedTouches }) =>
              handleSwipeEnd(changedTouches[0].clientX)
            }
          >
            {children &&
              React.Children.map(
                children as ReactElement,
                (child: ReactElement) =>
                  child &&
                  React.cloneElement(child, {
                    style: {
                      ...child.props.style,
                      width: `${width}px`,
                    },
                    className: `inner-carousel-item ${child.props.className}`,
                    draggable: false,
                  })
              )}
          </div>
        </div>
        <img
          src={ArrowIcon}
          className='arrow'
          style={{ transform: 'rotate(-90deg)' }}
          onClick={() => handleMove('next')}
        />
      </div>
      {/* <div className='button'>
        <button onClick={handeAutoStop}>Stop</button>
        <button onClick={() => setIsStopped((prevState) => !prevState)}>
          Play
        </button>
      </div> */}
    </>
  );
};
