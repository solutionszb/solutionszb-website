import React from 'react';
import CanvasBackground from './components/CanvasBackground';
import CompanyCard from './components/CompanyCard';
import AboutCard from './components/AboutCard';

function App() {
  return (
    <div className="App">
      <CanvasBackground />

      <main style={styles.main}>
        <div style={styles.container}>
          <CompanyCard />
          <AboutCard />
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-lg)',
    position: 'relative',
    zIndex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
  },
};

export default App;
