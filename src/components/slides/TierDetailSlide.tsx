import { Button } from '@/components/ui/button';
import { t } from '@/lib/translations';
import { NavigationArrows } from '../NavigationArrows';

interface TierDetailSlideProps {
  selectedTier: number;
  onNext?: () => void;
  onPrev?: () => void;
}

export const TierDetailSlide = ({ selectedTier, onNext, onPrev }: TierDetailSlideProps) => {
  const translations = t();
  const tier = translations.tierDetails.cards[selectedTier];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16 relative">
      <div className="max-w-4xl w-full space-y-8">
        {/* Tier card */}
        <div className="glass rounded-3xl p-12 space-y-8 shadow-2xl">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">{tier.name}</h2>
            <p className="text-lg italic text-muted-foreground">{tier.tagline}</p>
            <p className="text-3xl font-bold text-accent">{tier.price}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{translations.tierDetails.includesHeading}</h3>
            <ul className="space-y-3">
              {tier.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-lg">
                  <span className="text-primary text-xl">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <NavigationArrows showUp={true} showDown={true} onUpClick={onPrev} onDownClick={onNext} />
    </div>
  );
};
