import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <div className={styles.ring} />
            <div className={styles.ring} />
            <div className={styles.ring} />
            <div className={styles.dot} />
          </div>
        </div>
        <p className={styles.text}>Analyzing news...</p>
        <p className={styles.subtext}>Our AI is examining the content</p>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}
