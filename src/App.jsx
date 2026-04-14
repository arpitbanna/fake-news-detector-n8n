import { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import InputBox from './components/InputBox/InputBox';
import Loader from './components/Loader/Loader';
import ResultCard from './components/ResultCard/ResultCard';
import styles from './App.module.css';

const WEBHOOK_URL =
  import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook-test/fake-news';

/**
 * Picks an icon key based on simple keyword matching in a reason string.
 * Falls back to 'emotion' for unmatched reasons.
 */
function pickReasonIcon(text) {
  const lower = text.toLowerCase();
  if (lower.includes('credib') || lower.includes('source') || lower.includes('reference')) {
    return 'credibility';
  }
  if (lower.includes('inconsist') || lower.includes('claim') || lower.includes('contradict')) {
    return 'inconsistency';
  }
  return 'emotion';
}


/** Extracts and normalizes the reasons from any format the API might return. */
function extractReasons(raw) {
  // Try 'reasons' first, then 'reason' (singular)
  const src = raw?.reasons ?? raw?.reason ?? raw?.explanation ?? null;



  // Already an array — use directly
  if (Array.isArray(src) && src.length > 0) {
    return src.map((r) => ({
      text: typeof r === 'string' ? r.trim() : String(r).trim(),
      icon: pickReasonIcon(typeof r === 'string' ? r : ''),
    }));
  }

  // Single string — split by newline, bullet, or numbered list patterns
  if (typeof src === 'string' && src.trim().length > 0) {
    const lines = src
      .split(/[\n\r]+|(?:\d+\.\s)|(?:[-•]\s)/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return lines.map((line) => ({
      text: line,
      icon: pickReasonIcon(line),
    }));
  }

  return [{ text: 'No explanation available', icon: 'emotion' }];
}

function normalizeResult(raw) {
  return {
    verdict: String(raw?.verdict ?? 'Unknown').toUpperCase(),
    confidence: Number(raw?.confidence) || 0,
    sentiment: raw?.sentiment ?? 'Neutral',
    intensity: raw?.intensity ?? 'Low',
    credibility: `${Number(raw?.credibility) || 0}/10`,
    reasons: extractReasons(raw),
  };
}

export default function App() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = useCallback(async (text) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasAnalyzed(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text,
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Backend endpoint not found. Check your n8n workflow URL.'
            : response.status >= 500
            ? 'Server error — the backend encountered a problem.'
            : `Unexpected response (status ${response.status}).`
        );
      }

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Invalid response format — expected JSON from the backend.');
      }

      const raw = Array.isArray(data) ? data[0] : data;

      if (!raw || typeof raw !== 'object') {
        throw new Error('Empty or invalid response received from the backend.');
      }

      // Small delay so the loading animation feels intentional
      await new Promise((resolve) => setTimeout(resolve, 400));

      setResult(normalizeResult(raw));
    } catch (err) {
      const isNetworkError = err instanceof TypeError && err.message === 'Failed to fetch';
      setError(
        isNetworkError
          ? 'Cannot connect to the analysis backend. Please check the service is running.'
          : err.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setInputText('');
    setResult(null);
    setError(null);
    setHasAnalyzed(false);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <InputBox
            inputText={inputText}
            setInputText={setInputText}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            isLoading={isLoading}
          />

          <div className={styles.resultArea}>
            {isLoading && <Loader />}

            {!isLoading && error && (
              <div className={`${styles.emptyState} ${styles.errorState}`}>
                <div className={styles.errorIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <p className={styles.errorTitle}>{error}</p>
                <button
                  className={styles.retryBtn}
                  onClick={() => handleAnalyze(inputText)}
                  disabled={!inputText.trim()}
                >
                  ↻ Retry Analysis
                </button>
              </div>
            )}

            {!isLoading && !error && result && <ResultCard result={result} />}

            {!isLoading && !error && !result && !hasAnalyzed && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <p className={styles.emptyTitle}>Enter a news article to begin analysis</p>
                <p className={styles.emptySubtext}>
                  Paste any news headline or article above and click Analyze
                </p>
              </div>
            )}
          </div>
        </main>

        <footer className={styles.footer}>
          <p className={styles.footerBrand}>Powered by AI + n8n</p>
          <p className={styles.footerDisclaimer}>
            ⚠️ This is an AI-based prediction and may not be 100% accurate.
          </p>
        </footer>
      </div>
    </div>
  );
}
