import React from 'react';
import { t } from '../lib/translations';

const AboutCard: React.FC = () => {
  const translations = t();

  return (
    <div className="glass-card glass-card-coral" style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.heading}>About</h2>
        <p style={styles.description}>{translations.hero.description}</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    maxWidth: '700px',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  heading: {
    fontSize: 'var(--font-size-title-2)',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-sm)',
  },
  description: {
    fontSize: 'var(--font-size-callout)',
    lineHeight: 1.6,
    color: 'var(--color-text-secondary)',
  },
};

export default AboutCard;
