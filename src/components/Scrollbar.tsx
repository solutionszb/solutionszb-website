interface ScrollbarProps {
  currentSlide: number;
  totalSlides: number;
}

export const Scrollbar = ({ currentSlide, totalSlides }: ScrollbarProps) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 h-64 w-2">
      {/* Track */}
      <div className="absolute inset-0 bg-muted/30 rounded-full" />
      
      {/* Progress */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-700 ease-out"
        style={{ height: `${progress}%` }}
      />
      
      {/* Indicators */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index <= currentSlide ? 'bg-primary scale-125' : 'bg-muted/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
