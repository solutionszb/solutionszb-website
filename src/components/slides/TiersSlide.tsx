import { Button } from '@/components/ui/button';
import { t } from '@/lib/translations';
import { NavigationArrows } from '../NavigationArrows';

interface TiersSlideProps {
  onSelectTier?: (tier: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const TiersSlide = ({ onSelectTier, onNext, onPrev }: TiersSlideProps) => {
  const translations = t();
  const tiers = [
    {
      name: translations.tiers.cards[0].name,
      tagline: translations.tiers.cards[0].tagline,
      features: translations.tiers.cards[0].features,
      buttonText: translations.tiers.cards[0].buttonText,
      position: 'md:translate-y-8'
    },
    {
      name: translations.tiers.cards[1].name,
      tagline: translations.tiers.cards[1].tagline,
      features: translations.tiers.cards[1].features,
      buttonText: translations.tiers.cards[1].buttonText,
      position: 'md:-translate-y-8'
    },
    {
      name: translations.tiers.cards[2].name,
      tagline: translations.tiers.cards[2].tagline,
      features: translations.tiers.cards[2].features,
      buttonText: translations.tiers.cards[2].buttonText,
      position: 'md:translate-y-8'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16 relative">
      <div className="max-w-7xl w-full space-y-12">
        <h2 className="text-5xl md:text-6xl font-bold text-center">
          {translations.tiers.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-8 flex flex-col hover:scale-105 transition-all duration-300 shadow-xl ${tier.position}`}
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-primary">{tier.name}</h3>
                <p className="text-sm italic text-muted-foreground">{tier.tagline}</p>
              </div>

              <ul className="space-y-3 flex-grow mt-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => onSelectTier?.(index)}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavigationArrows showUp={true} showDown={true} onUpClick={onPrev} onDownClick={onNext} />
    </div>
  );
};
