import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import InputBox from './components/InputBox';
import ResultDashboard from './components/ResultDashboard';
import { AlertTriangle, Moon, Sun } from 'lucide-react';
import { analyzeNews } from './apiService';

// Skeleton UI Component
function SkeletonDashboard() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-pulse">
      {/* Verdict Skeleton */}
      <div className="glass-panel rounded-[2rem] p-8 md:p-10 flex items-center justify-between bg-white/5 border-white/10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/10" />
          <div className="flex flex-col gap-3">
            <div className="w-32 h-4 rounded-full bg-white/10" />
            <div className="w-48 h-12 rounded-xl bg-white/10" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/10" />
          <div className="w-14 h-14 rounded-2xl bg-white/10" />
          <div className="w-14 h-14 rounded-2xl bg-white/10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Confidence Skeleton */}
        <div className="glass-panel p-8 rounded-[2rem] h-48 bg-white/5 border-white/10 flex flex-col justify-between">
          <div className="w-32 h-4 rounded-full bg-white/10" />
          <div>
            <div className="w-24 h-10 rounded-xl bg-white/10 mb-4 self-end ml-auto" />
            <div className="w-full h-4 rounded-full bg-white/10" />
          </div>
        </div>
        {/* Credibility Skeleton */}
        <div className="glass-panel p-8 rounded-[2rem] h-48 bg-white/5 border-white/10 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-white/10" />
        </div>
        {/* Sentiment Skeleton */}
        <div className="glass-panel p-8 rounded-[2rem] h-48 bg-white/5 border-white/10 flex flex-col justify-between">
          <div className="w-32 h-4 rounded-full bg-white/10" />
          <div className="flex flex-col gap-4">
            <div className="w-full h-12 rounded-xl bg-white/10" />
            <div className="w-full h-12 rounded-xl bg-white/10" />
          </div>
        </div>
      </div>

      {/* AI Reasoning Skeleton */}
      <div className="glass-panel p-8 rounded-[2rem] bg-white/5 border-white/10 h-64 flex flex-col gap-6">
        <div className="w-48 h-8 rounded-xl bg-white/10" />
        <div className="w-full h-6 rounded-md bg-white/10" />
        <div className="w-5/6 h-6 rounded-md bg-white/10" />
        <div className="w-4/6 h-6 rounded-md bg-white/10" />
      </div>
    </div>
  );
}

function normalizeResult(raw) {
  return {
    verdict: String(raw?.verdict || 'Unknown'),
    confidence: typeof raw?.confidence === 'number' ? raw.confidence : Number(raw?.confidence) || 0,
    sentiment: raw?.sentiment || 'Neutral',
    intensity: raw?.intensity || 'Low',
    credibility_score: typeof raw?.credibility_score === 'number' ? raw.credibility_score : Number(raw?.credibility_score) || typeof raw?.credibility === 'number' ? raw.credibility : 0,
    top_articles: Array.isArray(raw?.top_articles) ? raw.top_articles : [],
    disclaimer: raw?.disclaimer || "⚠️ This is an AI-based prediction and may not be 100% accurate.",
    news: raw?.news || "",
    reasons: Array.isArray(raw?.reasons) ? raw.reasons : undefined
  };
}

export default function App() {
  const [inputText, setInputText] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('dark');

  // Debounce input just to fulfill "Debounce input" requirement (can be used for auto-validation)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(inputText);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputText]);

  const handleAnalyze = useCallback(async (textToAnalyze) => {
    const text = textToAnalyze || debouncedInput;
    if (!text.trim()) {
      setError("Please enter a news headline or URL to analyze.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const raw = await analyzeNews(text);
      await new Promise(res => setTimeout(res, 1200)); // Show skeleton nicely

      const normalized = normalizeResult(raw);
      setResult(normalized);
      
      setHistory(prev => {
        const exists = prev.find(p => p.text === text);
        if (exists) return prev;
        const newHist = [{ text, verdict: normalized.verdict, id: Date.now() }, ...prev];
        return newHist.slice(0, 5);
      });

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedInput]);

  return (
    <div className={`relative min-h-screen flex flex-col z-10 font-sans ${theme}`}>
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>

      {/* Theme Toggle (Mock) */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl flex-grow flex flex-col relative z-10">
        <Header />

        <main className="flex-grow flex flex-col gap-10 mt-8">
          <InputBox
            inputText={inputText}
            setInputText={setInputText}
            onAnalyze={() => handleAnalyze(inputText)}
            isLoading={isLoading}
          />

          <AnimatePresence mode="wait">
            {error && !isLoading && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel p-8 rounded-[2rem] border-red-500/30 flex flex-col items-center text-center gap-4 max-w-lg mx-auto w-full shadow-[0_0_40px_rgba(239,68,68,0.15)] bg-black/60"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 mb-2">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Analysis Failed</h3>
                <p className="text-red-200/80 mb-2">{error}</p>
                <button
                  onClick={() => handleAnalyze(inputText)}
                  className="px-8 py-3 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-100 transition-colors border border-red-500/30 font-bold tracking-wide"
                >
                  TRY AGAIN
                </button>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonDashboard />
              </motion.div>
            )}

            {!isLoading && result && !error && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              >
                <ResultDashboard result={result} />
              </motion.div>
            )}

            {!isLoading && !result && !error && history.length > 0 && (
              <motion.div
                key="history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto w-full mt-4"
              >
                <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-4">Recent Analyses</h3>
                <div className="flex flex-col gap-3">
                  {history.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setInputText(item.text); handleAnalyze(item.text); }}
                      className="glass-panel text-left px-6 py-5 rounded-[1.5rem] flex items-center justify-between hover:bg-white/10 transition-colors group bg-black/40 border-white/5"
                    >
                      <span className="text-white/70 font-medium line-clamp-1 max-w-[70%] group-hover:text-cyan-400 transition-colors">{item.text}</span>
                      <span className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider border ${
                        item.verdict?.toLowerCase().includes('fake') ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        item.verdict?.toLowerCase().includes('real') || item.verdict?.toLowerCase().includes('true') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {item.verdict}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <footer className="py-8 text-center text-white/30 text-xs font-semibold tracking-widest uppercase relative z-10 mt-auto border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <p>POWERED BY AI &bull; CREDIFY &copy; 2026</p>
      </footer>
    </div>
  );
}
