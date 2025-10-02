import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface TierDetailSlideProps {
  selectedTier: number;
  onBack: () => void;
  onSelectPlan: () => void;
}

export const TierDetailSlide = ({ selectedTier, onBack, onSelectPlan }: TierDetailSlideProps) => {
  const tiers = [
    {
      name: 'LOLLIPOP TIER',
      tagline: 'Taste test for low commitment high reward',
      price: 'Starting at $500/month',
      details: [
        '3 month minimum contract commitment',
        'Weekly maintenance and monitoring',
        'Basic integrations with conditional routing logic',
        'Secure credential management vault',
        'Includes 1-2 automations with AI capabilities',
        'Direct connection to your internal database',
        'Email support with 48-hour response time',
        'Perfect for testing automation benefits'
      ]
    },
    {
      name: 'BUBBLE GUM BLAST',
      tagline: 'You just keep on chewing and wanting more solutions',
      price: 'Custom Pricing',
      details: [
        'Everything included in Lollipop tier',
        '6-12+ month partnership contract',
        'Continuous workflow optimization',
        'Full cloud infrastructure integration',
        'Custom-tailored solutions for your architecture',
        'Processing fees covered (up to 50% over estimate)',
        'Priority support with 24-hour response time',
        'Quarterly strategy sessions',
        'Unlimited automation workflows',
        'Advanced AI implementation'
      ]
    },
    {
      name: 'SUMMER FLING - À LA CARTE',
      tagline: 'We build out your automation needs fully, provide documentation, and 90-day weekly support',
      price: 'Project-Based',
      details: [
        '90 days of weekly support included',
        'Full day team training session',
        'Additional training available at cost',
        'Complete documentation package',
        'Knowledge transfer sessions',
        'You manage processing fees and maintenance',
        'Perfect for in-house teams',
        'One-time implementation fee',
        'Ideal for specific project needs'
      ]
    }
  ];

  const tier = tiers[selectedTier];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <div className="max-w-4xl w-full space-y-8">
        {/* Back hint */}
        <div className="text-center fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm">
            <span>🤔</span>
            <span>Changed your mind? Go back to compare all options!</span>
          </div>
        </div>

        {/* Tier card */}
        <div className="glass rounded-3xl p-12 space-y-8 shadow-2xl">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">{tier.name}</h2>
            <p className="text-lg italic text-muted-foreground">{tier.tagline}</p>
            <p className="text-3xl font-bold text-accent">{tier.price}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">What's Included:</h3>
            <ul className="space-y-3">
              {tier.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-lg">
                  <span className="text-primary text-xl">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Compare Plans
            </Button>
            <Button
              onClick={onSelectPlan}
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Select This Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
