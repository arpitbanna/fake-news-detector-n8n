import styles from './VerdictBanner.module.css';

export default function VerdictBanner({ verdict }) {
  const isFake = verdict === 'FAKE';

  return (
    <div className={`${styles.banner} ${isFake ? styles.fake : styles.real}`}>
      <div className={styles.inner}>
        <div className={styles.iconCircle}>
          {isFake ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
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
          {isFake ? '⚠️ Unreliable' : '✅ Verified'}
        </div>
      </div>
      <div className={styles.shimmer} />
    </div>
  );
}
