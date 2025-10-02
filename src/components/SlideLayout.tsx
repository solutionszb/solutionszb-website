import { useState } from 'react';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import { useTheme } from '@/hooks/useTheme';
import { CanvasBackground } from './CanvasBackground';
import { ThemeToggle } from './ThemeToggle';
import { ProgressBar } from './ProgressBar';
import { RobotHelper } from './RobotHelper';
import { HeroSlide } from './slides/HeroSlide';
import { SolutionsSlide } from './slides/SolutionsSlide';
import { TiersSlide } from './slides/TiersSlide';
import { TierDetailSlide } from './slides/TierDetailSlide';
import { ContactSlide } from './slides/ContactSlide';

export const SlideLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentSlide, goToSlide, nextSlide } = useSlideNavigation(5);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const handleSelectTier = (tier: number) => {
    setSelectedTier(tier);
    goToSlide(3);
  };

  const handleBackToTiers = () => {
    goToSlide(2);
  };

  const handleSelectPlan = () => {
    nextSlide();
  };

  const slides = [
    <HeroSlide key="hero" />,
    <SolutionsSlide key="solutions" />,
    <TiersSlide key="tiers" onSelectTier={handleSelectTier} />,
    selectedTier !== null ? (
      <TierDetailSlide 
        key="tier-detail" 
        selectedTier={selectedTier}
        onBack={handleBackToTiers}
        onSelectPlan={handleSelectPlan}
      />
    ) : (
      <div key="tier-detail" />
    ),
    <ContactSlide key="contact" />
  ];

  // Show robot helper on slides 0-3 (not on contact form)
  const showRobotHelper = currentSlide < 4;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <CanvasBackground />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <ProgressBar currentSlide={currentSlide} totalSlides={5} />
      <RobotHelper show={showRobotHelper} />

      <div className="relative z-10">
        {slides[currentSlide]}
      </div>
    </div>
  );
};
