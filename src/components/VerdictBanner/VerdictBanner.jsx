import styles from './VerdictBanner.module.css';

export default function VerdictBanner({ verdict }) {
  const isFake = verdict === 'FAKE';
  const isUnclear = verdict === 'UNCLEAR';
  
  const bannerClass = isFake ? styles.fake : isUnclear ? styles.unclear : styles.real;

  return (
    <div className={`${styles.banner} ${bannerClass}`}>
      <div className={styles.inner}>
        <div className={styles.iconCircle}>
          {isFake ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          ) : isUnclear ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
        </div>
        <div className={styles.content}>
          <span className={styles.label}>Verdict</span>
          <span className={styles.verdict}>{verdict}</span>
        </div>
        <div className={styles.badge}>
          {isFake ? '⚠️ Unreliable' : isUnclear ? '⚠ Needs Review' : '✅ Verified'}
        </div>
      </div>
      <div className={styles.shimmer} />
    </div>
  );
}
