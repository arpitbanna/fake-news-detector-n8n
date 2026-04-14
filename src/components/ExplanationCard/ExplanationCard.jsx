import styles from './ExplanationCard.module.css';

const reasonIcons = {
  emotion: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15h8" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  credibility: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  inconsistency: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

/**
 * Normalizes a reason entry — handles both plain strings and {text, icon} objects.
 */
function normalizeReason(reason) {
  if (typeof reason === 'string') {
    return { text: reason, icon: 'emotion' };
  }
  return {
    text: reason?.text ?? String(reason),
    icon: reason?.icon ?? 'emotion',
  };
}

export default function ExplanationCard({ reasons }) {
  const safeReasons = Array.isArray(reasons) && reasons.length > 0
    ? reasons.map(normalizeReason)
    : [{ text: 'No explanation available', icon: 'emotion' }];

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h3 className={styles.title}>Why this result?</h3>
        </div>
        <ul className={styles.list}>
          {safeReasons.map((reason, index) => (
            <li
              key={index}
              className={styles.item}
              style={{ animationDelay: `${(index + 1) * 120}ms` }}
            >
              <div className={styles.itemIcon}>
                {reasonIcons[reason.icon] ?? reasonIcons.emotion}
              </div>
              <span className={styles.itemText}>{reason.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

