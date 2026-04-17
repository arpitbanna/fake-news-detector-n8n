import { useEffect, useState } from 'react';
import styles from './MetricCard.module.css';

export default function MetricCard({ icon, title, value, type, delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const renderContent = () => {
    switch (type) {
      case 'confidence':
        return <ConfidenceContent value={value} visible={visible} />;
      case 'sentiment':
        return <SentimentContent value={value} />;
      case 'intensity':
        return <IntensityContent value={value} />;
      case 'credibility':
        return <CredibilityContent value={value} visible={visible} />;
      default:
        return <span className={styles.value}>{value}</span>;
    }
  };

  return (
    <div
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>
        {renderContent()}
      </div>
    </div>
  );
}

function ConfidenceContent({ value, visible }) {
  return (
    <div className={styles.confidenceWrapper}>
      <span className={styles.percentValue}>{value}%</span>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{
            width: visible ? `${value}%` : '0%',
            background: value > 70
              ? 'linear-gradient(90deg, #22c55e, #4ade80)'
              : value > 40
              ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
              : 'linear-gradient(90deg, #ef4444, #f87171)',
          }}
        />
      </div>
    </div>
  );
}

function SentimentContent({ value }) {
  const colorMap = {
    Positive: { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
    Neutral: { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
    Negative: { bg: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: 'rgba(239, 68, 68, 0.3)' },
  };
  const style = colorMap[value] || colorMap.Neutral;

  return (
    <span
      className={styles.badge}
      style={{
        background: style.bg,
        color: style.color,
        borderColor: style.border,
      }}
    >
      {value === 'Positive' && '😊 '}
      {value === 'Neutral' && '😐 '}
      {value === 'Negative' && '😟 '}
      {value}
    </span>
  );
}

function IntensityContent({ value }) {
  const levels = ['Low', 'Medium', 'High'];
  const activeIndex = levels.indexOf(value);

  return (
    <div className={styles.intensityWrapper}>
      <div className={styles.pillGroup}>
        {levels.map((level, i) => (
          <span
            key={level}
            className={`${styles.pill} ${i <= activeIndex ? styles.pillActive : ''}`}
            style={{
              '--pill-color': i === 0 ? '#4ade80' : i === 1 ? '#fbbf24' : '#f87171',
            }}
          >
            {level}
          </span>
        ))}
      </div>
    </div>
  );
}

function CredibilityContent({ value, visible }) {
  const score = Number(value) || 0;
  const max = 10;
  const percentage = (score / max) * 100;

  return (
    <div className={styles.credibilityWrapper}>
      <div className={styles.scoreDisplay}>
        <span className={styles.scoreMain}>{score}</span>
        <span className={styles.scoreMax}> / {max}</span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{
            width: visible ? `${percentage}%` : '0%',
            background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
          }}
        />
      </div>
    </div>
  );
}
