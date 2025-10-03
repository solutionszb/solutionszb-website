import { useState, useRef, useEffect } from 'react';

interface ScrollbarProps {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
}

export const Scrollbar = ({ currentSlide, totalSlides, goToSlide }: ScrollbarProps) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, y / rect.height));
    const slideIndex = Math.floor(percentage * totalSlides);

    if (slideIndex >= 0 && slideIndex < totalSlides && slideIndex !== currentSlide) {
      goToSlide(slideIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleDrag(e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDrag(e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 h-64 w-2 cursor-pointer"
      onMouseDown={handleMouseDown}
    >
      {/* Track */}
      <div className="absolute inset-0 bg-muted/30 rounded-full" />

      {/* Progress - reversed direction (top to bottom) */}
      <div
        className="absolute top-0 left-0 right-0 bg-primary rounded-full transition-all duration-700 ease-out"
        style={{ height: `${progress}%` }}
      />

      {/* Indicators */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-150 ${
              index <= currentSlide ? 'bg-primary scale-125' : 'bg-muted/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
