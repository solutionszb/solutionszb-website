import { Button } from '@/components/ui/button';
import { NavigationArrows } from '../NavigationArrows';

interface TiersSlideProps {
  onSelectTier?: (tier: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const TiersSlide = ({ onSelectTier, onNext, onPrev }: TiersSlideProps) => {
  const tiers = [
    {
      name: 'LOLLIPOP TIER',
      tagline: 'Taste test for low commitment high reward',
      features: [
        '3 month contract',
        'Weekly maintenance',
        'Basic integrations with conditional routing',
        'Secure Vault for Connection Credentials',
        'Starting at $500 monthly for 1-2 automations utilizing AI steps and data connection to your internal database'
      ],
      position: 'md:translate-y-8'
    },
    {
      name: 'BUBBLE GUM BLAST',
      tagline: 'You just keep on chewing and wanting more solutions',
      features: [
        'Everything in Lollipop tier',
        '6-12+ month starting contract',
        'On-going workflow maintenance',
        'Full cloud integration and new custom tailored solutions that fits your architecture',
        'I cover the processing fees and costs (slight price increase if run volume exceeds client approximates by 50%)',
        'Secure Vault for Connection Credentials'
      ],
      position: 'md:-translate-y-8'
    },
    {
      name: 'SUMMER FLING - À LA CARTE',
      tagline: 'We build out your automation needs fully, provide documentation, and 90-day weekly support',
      features: [
        '90 days support',
        '1 day team training',
        'Increased training at a cost',
        'Documentation package',
        'You house the software processing fees and maintenance costs'
      ],
      position: 'md:translate-y-8'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16 relative">
      <div className="max-w-7xl w-full space-y-12">
        <h2 className="text-5xl md:text-6xl font-bold text-center">
          Choose Your Path
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
                  Learn More
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
