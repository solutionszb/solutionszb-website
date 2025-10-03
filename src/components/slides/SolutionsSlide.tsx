import { Wrench, Zap, TrendingUp } from 'lucide-react';
import { t } from '@/lib/translations';
import { NavigationArrows } from '../NavigationArrows';

interface SolutionsSlideProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const SolutionsSlide = ({ onNext, onPrev }: SolutionsSlideProps) => {
  const translations = t();
  const features = [
    {
      icon: Wrench,
      title: translations.solutions.features[0].title,
      description: translations.solutions.features[0].description
    },
    {
      icon: Zap,
      title: translations.solutions.features[1].title,
      description: translations.solutions.features[1].description
    },
    {
      icon: TrendingUp,
      title: translations.solutions.features[2].title,
      description: translations.solutions.features[2].description
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 relative">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold">
            {translations.solutions.title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {translations.solutions.subtitle}
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
