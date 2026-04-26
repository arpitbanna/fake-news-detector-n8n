import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center w-full flex flex-col items-center pt-10 pb-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20"
      >
        <ShieldCheck className="w-10 h-10 text-cyan-400" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase"
      >
        CRED<span className="neon-text">IFY</span>
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl text-purple-200/60 max-w-2xl mx-auto font-medium tracking-wide"
      >
        Truth, Verified by AI
      </motion.p>
    </header>
  );
}
