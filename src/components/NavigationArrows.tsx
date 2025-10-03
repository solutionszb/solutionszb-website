import { ChevronDown, ChevronUp } from 'lucide-react';

interface NavigationArrowsProps {
  showUp?: boolean;
  showDown?: boolean;
}

export const NavigationArrows = ({ showUp = false, showDown = false }: NavigationArrowsProps) => {
  return (
    <>
      {showUp && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bob">
          <ChevronUp className="w-10 h-10 text-primary opacity-60" strokeWidth={2} />
        </div>
      )}
      {showDown && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bob">
          <ChevronDown className="w-10 h-10 text-primary opacity-60" strokeWidth={2} />
        </div>
      )}
    </>
  );
};
