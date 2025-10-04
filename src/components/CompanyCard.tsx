import React from 'react';
import { t } from '../lib/translations';

const CompanyCard: React.FC = () => {
  const translations = t();

  return (
    <div className="glass-card glass-card-magenta" style={styles.card}>
      <div style={styles.content}>
        <h1 style={styles.brandName}>zachsai</h1>
        <p style={styles.tagline}>
          {translations.hero.title}{' '}
          <span style={styles.highlight}>{translations.hero.titleHighlight}</span>
        </p>
        <p style={styles.subtitle}>{translations.hero.subtitle}</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    maxWidth: '650px',
    width: '100%',
  },
  content: {
    textAlign: 'center',
  },
  brandName: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 'var(--space-md)',
    background: 'linear-gradient(135deg, var(--electric-magenta) 0%, var(--coral-energy) 50%, var(--ruby-accent) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
    textTransform: 'lowercase',
  },
  tagline: {
    fontSize: 'var(--font-size-title-3)',
    fontWeight: 600,
    lineHeight: 1.3,
    marginBottom: 'var(--space-sm)',
    color: 'var(--color-text-primary)',
  },
  highlight: {
    background: 'linear-gradient(135deg, var(--electric-magenta) 0%, var(--ruby-accent) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 'var(--font-size-callout)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.01em',
  },
};

export default CompanyCard;
