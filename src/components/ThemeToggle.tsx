import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  // Use opposite theme's primary color for border
  const borderColor = theme === 'dark' ? '#c63f60' : '#c0395b';
  
  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass rounded-full"
      style={{ borderWidth: '2px', borderStyle: 'solid', borderColor }}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};
