import { t } from '@/lib/translations';
import { NavigationArrows } from '../NavigationArrows';

interface ContactSlideProps {
  onPrev?: () => void;
}

export const ContactSlide = ({ onPrev }: ContactSlideProps) => {
  const translations = t();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16 relative">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold">
            {translations.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {translations.contact.subtitle}
          </p>
        </div>

        <div className="glass rounded-3xl overflow-hidden shadow-2xl">
          <iframe 
            src="https://guiltless-polo-eab.notion.site/ebd/2804a49f877b80b1b037d9e068c40081" 
            width="100%" 
            height="600" 
            frameBorder="0"
            className="w-full"
          />
        </div>
      </div>
      <NavigationArrows showUp={true} showDown={false} onUpClick={onPrev} />
    </div>
  );
};
