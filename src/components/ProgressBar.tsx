interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
}

export const ProgressBar = ({ currentSlide, totalSlides }: ProgressBarProps) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 h-80 w-8">
      {/* Candy cane container */}
      <div className="relative h-full w-full rounded-full overflow-hidden bg-white shadow-lg">
        {/* Diagonal stripes background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              #ef4444,
              #ef4444 10px,
              #ffffff 10px,
              #ffffff 20px
            )`
          }}
        />
        
        {/* Progress mask */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gray-300 transition-all duration-500"
          style={{
            height: `${100 - progress}%`
          }}
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute inset-0 flex flex-col justify-around py-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`w-full h-1 transition-opacity ${
              i === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
