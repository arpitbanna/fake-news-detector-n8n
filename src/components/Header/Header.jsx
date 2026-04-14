import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.iconWrapper}>
        <svg
          className={styles.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AI Brain Icon */}
          <circle cx="24" cy="24" r="20" stroke="url(#headerGrad)" strokeWidth="2.5" fill="none" />
          <circle cx="24" cy="24" r="14" stroke="url(#headerGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="24" cy="18" r="3" fill="url(#headerGrad)" />
          <circle cx="18" cy="28" r="2.5" fill="url(#headerGrad)" opacity="0.8" />
          <circle cx="30" cy="28" r="2.5" fill="url(#headerGrad)" opacity="0.8" />
          <line x1="24" y1="21" x2="18" y2="25.5" stroke="url(#headerGrad)" strokeWidth="1.5" />
          <line x1="24" y1="21" x2="30" y2="25.5" stroke="url(#headerGrad)" strokeWidth="1.5" />
          <line x1="18" y1="28" x2="30" y2="28" stroke="url(#headerGrad)" strokeWidth="1" opacity="0.4" />
          <defs>
            <linearGradient id="headerGrad" x1="4" y1="4" x2="44" y2="44">
              <stop stopColor="#818cf8" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.iconGlow} />
      </div>
      <h1 className={styles.title}>
        AI Fake News Detector
      </h1>
      <p className={styles.subtitle}>
        Analyze news articles for authenticity using AI
      </p>
      <div className={styles.divider} />
    </header>
  );
}
