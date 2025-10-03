import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import { CanvasBackground } from './CanvasBackground';
import { Scrollbar } from './Scrollbar';
import { HeroSlide } from './slides/HeroSlide';
import { SolutionsSlide } from './slides/SolutionsSlide';
import { TiersSlide } from './slides/TiersSlide';
import { TierDetailSlide } from './slides/TierDetailSlide';
import { ContactSlide } from './slides/ContactSlide';

export const SlideLayout = () => {
  const { currentSlide, goToSlide, nextSlide, prevSlide } = useSlideNavigation(7);

  const slides = [
    <HeroSlide key="hero" onNavigate={nextSlide} />,
    <SolutionsSlide key="solutions" onNext={nextSlide} onPrev={prevSlide} />,
    <TiersSlide key="tiers" onSelectTier={(tier) => goToSlide(tier + 3)} onNext={nextSlide} onPrev={prevSlide} />,
    <TierDetailSlide key="lollipop" selectedTier={0} onNext={nextSlide} onPrev={prevSlide} />,
    <TierDetailSlide key="bubblegum" selectedTier={1} onNext={nextSlide} onPrev={prevSlide} />,
    <TierDetailSlide key="summerfling" selectedTier={2} onNext={nextSlide} onPrev={prevSlide} />,
    <ContactSlide key="contact" onPrev={prevSlide} />
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <CanvasBackground />
      <Scrollbar currentSlide={currentSlide} totalSlides={7} goToSlide={goToSlide} />

      <div className="relative z-10 slide-transition">
        {slides[currentSlide]}
      </div>
    </div>
  );
};
