import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import { useTheme } from '@/hooks/useTheme';
import { CanvasBackground } from './CanvasBackground';
import { ThemeToggle } from './ThemeToggle';
import { RobotHelper } from './RobotHelper';
import { Scrollbar } from './Scrollbar';
import { HeroSlide } from './slides/HeroSlide';
import { SolutionsSlide } from './slides/SolutionsSlide';
import { TiersSlide } from './slides/TiersSlide';
import { TierDetailSlide } from './slides/TierDetailSlide';
import { ContactSlide } from './slides/ContactSlide';

export const SlideLayout = () => {
  const { theme, toggleTheme } = useTheme();

  const { currentSlide, goToSlide } = useSlideNavigation(7);

  const slides = [
    <HeroSlide key="hero" />,
    <SolutionsSlide key="solutions" />,
    <TiersSlide key="tiers" onSelectTier={(tier) => goToSlide(tier + 3)} />,
    <TierDetailSlide key="lollipop" selectedTier={0} />,
    <TierDetailSlide key="bubblegum" selectedTier={1} />,
    <TierDetailSlide key="summerfling" selectedTier={2} />,
    <ContactSlide key="contact" />
  ];

  // Show robot helper on slides 0-2 (Hero, Solutions, Tiers only)
  const showRobotHelper = currentSlide < 3;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <CanvasBackground />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <RobotHelper show={showRobotHelper} currentSlide={currentSlide} />
      <Scrollbar currentSlide={currentSlide} totalSlides={7} />

      <div className="relative z-10 slide-transition">
        {slides[currentSlide]}
      </div>
    </div>
  );
};
