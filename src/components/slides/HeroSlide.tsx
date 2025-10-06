import { t } from '@/lib/translations';

export const HeroSlide = () => {
  const translations = t();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          {translations.hero.title}{' '}
          <span className="text-primary">{translations.hero.titleHighlight}</span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground">
          {translations.hero.subtitle}
        </h2>

        <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-3xl mx-auto">
          {translations.hero.description}
        </p>
      </div>
    </div>
  );
};
