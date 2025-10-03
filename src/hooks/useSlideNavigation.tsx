import { useEffect, useState, useCallback } from 'react';

export const useSlideNavigation = (totalSlides: number, canNavigateForward: () => boolean = () => true) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > currentSlide ? 'forward' : 'backward');
      setCurrentSlide(index);
    }
  }, [currentSlide, totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1 && canNavigateForward()) {
      setDirection('forward');
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides, canNavigateForward]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection('backward');
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevSlide();
          break;
      }
    };

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        isScrolling = true;
        if (e.deltaY > 0) {
          nextSlide();
        } else if (e.deltaY < 0) {
          prevSlide();
        }

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }, 50);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [nextSlide, prevSlide]);

  return { currentSlide, direction, goToSlide, nextSlide, prevSlide };
};
