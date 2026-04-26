import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

export default function InputBox({ inputText, setInputText, onAnalyze, isLoading }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-panel p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-500/50 shadow-2xl">
        <div className="flex-grow flex items-center w-full px-4 py-2">
          <Search className="w-6 h-6 text-purple-300/50 mr-3 hidden md:block" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste a news headline or article URL here..."
            className="w-full bg-transparent border-none outline-none text-lg text-white placeholder-purple-200/40"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                onAnalyze(inputText);
              } else if (e.key === 'Enter') {
                onAnalyze(inputText);
              }
            }}
          />
        </div>
        <button
          onClick={() => onAnalyze(inputText)}
          disabled={isLoading || !inputText.trim()}
          className={`
            w-full md:w-auto px-8 py-4 rounded-xl md:rounded-full font-semibold text-lg flex items-center justify-center gap-2
            transition-all duration-300 relative overflow-hidden group shrink-0
            ${isLoading || !inputText.trim() 
              ? 'bg-white/5 text-white/30 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white neon-glow'
            }
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Analyze News</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </>
          )}
        </button>
      </div>
      <p className="text-center text-sm text-purple-200/40 mt-4 flex items-center justify-center gap-2">
        <kbd className="px-2 py-1 bg-black/40 rounded-md border border-white/10 font-mono text-xs text-purple-300">Ctrl + Enter</kbd> to analyze instantly
      </p>
    </motion.div>
  );
}
