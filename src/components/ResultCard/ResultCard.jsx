import VerdictBanner from '../VerdictBanner/VerdictBanner';
import MetricCard from '../MetricCard/MetricCard';
import ExplanationCard from '../ExplanationCard/ExplanationCard';
import styles from './ResultCard.module.css';

export default function ResultCard({ result }) {
  const { verdict, confidence, sentiment, intensity, credibility, reasons } = result;

  return (
    <div className={styles.wrapper}>
      <VerdictBanner verdict={verdict} />

      <div className={styles.metricsGrid}>
        <MetricCard
          icon="📊"
          title="Confidence"
          value={confidence}
          type="confidence"
          delay={100}
        />
        <MetricCard
          icon="🧠"
          title="Sentiment"
          value={sentiment}
          type="sentiment"
          delay={200}
        />
        <MetricCard
          icon="⚡"
          title="Intensity"
          value={intensity}
          type="intensity"
          delay={300}
        />
        <MetricCard
          icon="⭐"
          title="Credibility"
          value={credibility}
          type="credibility"
          delay={400}
        />
      </div>

      <ExplanationCard reasons={reasons} />
    </div>
  );
}
