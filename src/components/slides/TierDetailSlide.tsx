import { Button } from '@/components/ui/button';

interface TierDetailSlideProps {
  selectedTier: number;
}

export const TierDetailSlide = ({ selectedTier }: TierDetailSlideProps) => {
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
      price: 'Starting at $10,000 for project-based buildout',
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
        </div>
      </div>
    </div>
  );
};
