import { Wrench, Zap, TrendingUp } from 'lucide-react';
import { NavigationArrows } from '../NavigationArrows';

interface SolutionsSlideProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const SolutionsSlide = ({ onNext, onPrev }: SolutionsSlideProps) => {
  const features = [
    {
      icon: Wrench,
      title: 'Gumloop Expertise',
      description: "Master of complex workflows that Zapier can't handle. If Zapier is a calculator, Gumloop is Wolfram Alpha."
    },
    {
      icon: Zap,
      title: '24/7 Automation',
      description: 'Your automation infrastructure works reliably while we continuously identify and implement new opportunities.'
    },
    {
      icon: TrendingUp,
      title: 'Real Results',
      description: '200%+ revenue increases at client companies. We deliver $50K value for every $10K invested.'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 relative">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold">
            Gumloop-Powered Solutions
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            AI-native automation, not AI-added automation. Built for manufacturing excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 space-y-4 hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <div className="text-5xl mb-4">
                <feature.icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <NavigationArrows showUp={true} showDown={true} onUpClick={onPrev} onDownClick={onNext} />
    </div>
  );
};
