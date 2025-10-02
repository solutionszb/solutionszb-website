import { useEffect, useState } from 'react';

interface RobotHelperProps {
  show: boolean;
  currentSlide: number;
}

export const RobotHelper = ({ show, currentSlide }: RobotHelperProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  if (!visible) return null;

  const getMessage = () => {
    return (
      <p className="text-sm font-medium">
        Press <kbd className="px-2 py-1 bg-muted rounded text-xs">SPACE</kbd> or use{' '}
        <kbd className="px-2 py-1 bg-muted rounded text-xs">ARROW KEYS</kbd> to navigate
      </p>
    );
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 fade-in">
      <div className="flex items-end gap-3">
        {/* Speech bubble */}
        <div className="glass rounded-2xl rounded-br-none px-4 py-3 max-w-xs shadow-lg">
          {getMessage()}
        </div>

        {/* Robot emoji with float animation */}
        <div className="text-5xl float">
          🤖
        </div>
      </div>
    </div>
  );
};
