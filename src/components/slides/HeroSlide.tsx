import { ChevronDown } from 'lucide-react';

interface HeroSlideProps {
  onNavigate?: () => void;
}

export const HeroSlide = ({ onNavigate }: HeroSlideProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center relative">
      <div className="max-w-4xl space-y-8">
        <div className="text-3xl md:text-4xl font-bold text-primary mb-4">
          solutionsZB
        </div>
        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          AI Automation at the{' '}
          <span className="text-primary">Speed of Enthusiasm</span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground">
          Where AI Meets Energy
        </h2>

        <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-3xl mx-auto">
          I'm a 26-year-old automation specialist who helps manufacturers streamline their operations
          using Gumloop - the most advanced automation platform most consultants haven't even heard of yet.
          My clients love working with someone who gets genuinely excited about solving their problems.
        </p>
      </div>

      <button
        onClick={onNavigate}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bob cursor-pointer group"
        aria-label="Go to next slide"
      >
        <div className="glass rounded-lg p-3 group-hover:scale-110 transition-transform">
          <ChevronDown className="w-8 h-8 text-primary" strokeWidth={2.5} />
        </div>
      </button>
    </div>
  );
};
