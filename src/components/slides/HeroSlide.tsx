import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const HeroSlide = () => {
  const translations = t();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://api.gumloop.com/api/v1/start_pipeline?api_key=4c6fce60e40645ba8c700a69c0bf7ca4&user_id=uj7Pg0b6YLOBiLqL0iBbPzNPvKI3&saved_item_id=jLGnNgNZwCodtdnrN4WfEX',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert('Thank you for joining the waitlist!');
        setEmail('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <div className="max-w-4xl space-y-8">
        <div className="text-7xl md:text-8xl font-bold text-primary mb-8">
          Coming Soon
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          {translations.hero.title}{' '}
          <span className="text-primary">{translations.hero.titleHighlight}</span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground">
          {translations.hero.subtitle}
        </h2>

        <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-3xl mx-auto">
          {translations.hero.description}
        </p>

        <div className="mt-12 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Join the Client Waiting List</h3>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
