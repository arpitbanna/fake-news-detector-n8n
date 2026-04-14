import styles from './InputBox.module.css';

export default function InputBox({ inputText, setInputText, onAnalyze, onClear, isLoading }) {
  const handleAnalyze = () => {
    if (inputText.trim() && !isLoading) {
      onAnalyze(inputText.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAnalyze();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <span className={styles.headerTitle}>News Analysis</span>
        </div>

        <div className={styles.textareaWrapper}>
          <textarea
            id="news-input"
            className={styles.textarea}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste a news article or headline here..."
            rows={6}
            disabled={isLoading}
          />
          <div className={styles.charCount}>
            {inputText.length > 0 && (
              <span className={inputText.length > 5000 ? styles.charOver : ''}>
                {inputText.length.toLocaleString()} characters
              </span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            id="analyze-btn"
            className={styles.analyzeBtn}
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isLoading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>{isLoading ? 'Analyzing...' : 'Analyze News'}</span>
          </button>
          <button
            id="clear-btn"
            className={styles.clearBtn}
            onClick={onClear}
            disabled={!inputText || isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Clear</span>
          </button>
        </div>

        <p className={styles.hint}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Press <kbd>Ctrl + Enter</kbd> to analyze quickly
        </p>
      </div>
    </div>
  );
}

