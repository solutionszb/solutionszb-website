import { ChevronDown, ChevronUp } from 'lucide-react';

interface NavigationArrowsProps {
  showUp?: boolean;
  showDown?: boolean;
  onUpClick?: () => void;
  onDownClick?: () => void;
}

export const NavigationArrows = ({ showUp = false, showDown = false, onUpClick, onDownClick }: NavigationArrowsProps) => {
  return (
    <>
      {showUp && (
        <button
          onClick={onUpClick}
          className="absolute top-16 left-1/2 transform -translate-x-1/2 bob cursor-pointer group"
          aria-label="Go to previous slide"
        >
          <div className="glass rounded-lg p-3 group-hover:scale-110 transition-transform">
            <ChevronUp className="w-8 h-8 text-primary" strokeWidth={2.5} />
          </div>
        </button>
      )}
      {showDown && (
        <button
          onClick={onDownClick}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bob cursor-pointer group"
          aria-label="Go to next slide"
        >
          <div className="glass rounded-lg p-3 group-hover:scale-110 transition-transform">
            <ChevronDown className="w-8 h-8 text-primary" strokeWidth={2.5} />
          </div>
        </button>
      )}
    </>
  );
};
