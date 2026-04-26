import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Copy, Share2, Download, BadgeCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Simple CountUp component
function CountUp({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export default function ResultDashboard({ result }) {
  const { verdict, confidence, credibility_score, sentiment, intensity, top_articles, disclaimer } = result;

  const isFake = verdict?.toLowerCase().includes('fake');
  const isReal = verdict?.toLowerCase().includes('real') || verdict?.toLowerCase().includes('true');
  
  const statusColor = isFake ? 'text-red-500' : isReal ? 'text-emerald-400' : 'text-amber-400';
  const statusBg = isFake ? 'bg-red-500/10 border-red-500/30' : isReal ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30';
  const statusGlow = isFake ? 'shadow-[0_0_30px_rgba(239,68,68,0.2)]' : isReal ? 'shadow-[0_0_30px_rgba(52,211,153,0.2)]' : 'shadow-[0_0_30px_rgba(251,191,36,0.2)]';
  const Icon = isFake ? XCircle : isReal ? CheckCircle2 : AlertTriangle;

  // Credibility Chart Data
  const chartData = [
    { name: 'Score', value: credibility_score },
    { name: 'Remaining', value: 100 - credibility_score }
  ];
  const chartColor = isFake ? '#ef4444' : isReal ? '#10b981' : '#f59e0b';

  // Fallback Reasons
  const reasons = result.reasons?.length ? result.reasons : [
    isReal ? "High similarity with verified news outlets." : isFake ? "Multiple contradicting statements found across verified sources." : "Source reliability is unverified or mixed.",
    `Sentiment analysis indicates a ${intensity.toLowerCase()} ${sentiment.toLowerCase()} emotional tone.`,
    `Credibility score is ${credibility_score}/100, indicating a ${isFake ? 'low' : isReal ? 'high' : 'moderate'} level of trust in the source.`
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto flex flex-col gap-8"
    >
      {/* 1. Verdict Card (Top) */}
      <motion.div variants={item} className={`glass-panel border rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 ${statusBg} ${statusGlow}`}>
        <div className="flex items-center gap-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-black/40 border border-white/10`}>
            <Icon className={`w-12 h-12 ${statusColor}`} />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-2">Final Verdict</h2>
            <div className={`text-5xl md:text-6xl font-black uppercase tracking-tight ${statusColor} drop-shadow-md`}>
              {verdict}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="p-4 rounded-2xl bg-black/20 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white" title="Copy Result">
            <Copy className="w-5 h-5" />
          </button>
          <button className="p-4 rounded-2xl bg-black/20 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white" title="Share">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-4 rounded-2xl bg-black/20 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white" title="Export PDF">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 2. Confidence Section */}
        <motion.div variants={item} className="glass-panel p-8 rounded-[2rem] flex flex-col justify-between border-white/5 shadow-lg shadow-purple-900/20 bg-black/40">
          <h3 className="text-sm font-semibold tracking-wider text-white/40 uppercase mb-6">AI Confidence</h3>
          <div className="relative pt-1 flex-grow flex flex-col justify-end">
            <div className="flex mb-4 items-end justify-between">
              <span className="text-xs font-medium px-3 py-1.5 uppercase rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Model Certainty
              </span>
              <div className="text-right flex items-baseline gap-1">
                <span className="text-5xl font-black text-white tracking-tighter">
                  <CountUp value={confidence} />
                </span>
                <span className="text-xl font-bold text-white/50">%</span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-full bg-white/5 border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="shadow-[0_0_15px_rgba(34,211,238,0.5)] flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-cyan-400"
              />
            </div>
          </div>
        </motion.div>

        {/* 3. Credibility Score */}
        <motion.div variants={item} className="glass-panel p-8 rounded-[2rem] flex flex-col items-center justify-center border-white/5 bg-black/40 relative">
          <h3 className="text-sm font-semibold tracking-wider text-white/40 uppercase absolute top-8 left-8">Source Trust Score</h3>
          <div className="w-40 h-40 mt-6 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={55}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={chartColor} />
                  <Cell fill="rgba(255,255,255,0.05)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black"><CountUp value={credibility_score} /></span>
              <span className="text-xs font-bold text-white/30 tracking-widest uppercase mt-1">/ 100</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Sentiment Analysis */}
        <motion.div variants={item} className="glass-panel p-8 rounded-[2rem] flex flex-col justify-between border-white/5 bg-black/40">
          <h3 className="text-sm font-semibold tracking-wider text-white/40 uppercase mb-4">Content Sentiment</h3>
          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider">Tone</span>
              <span className="px-4 py-1.5 bg-white/10 rounded-lg text-sm font-bold capitalize text-white drop-shadow-md">{sentiment}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-sm font-medium text-white/50 uppercase tracking-wider">Intensity</span>
              <span className="px-4 py-1.5 bg-white/10 rounded-lg text-sm font-bold capitalize text-white drop-shadow-md">{intensity}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Reasoning Panel (IMPORTANT) */}
      <motion.div variants={item} className="glass-panel p-8 rounded-[2rem] border-white/5 shadow-lg bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500" />
        <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <span className="text-purple-400 font-bold">AI</span>
          </div>
          Why this verdict?
        </h3>
        <ul className="space-y-4">
          {reasons.map((reason, idx) => (
            <motion.li 
              key={idx} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (idx * 0.1) }}
              className="flex items-start gap-3 text-white/80"
            >
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <p className="leading-relaxed">{reason}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Fact-Check Articles */}
      {top_articles && top_articles.length > 0 && (
        <motion.div variants={item} className="mt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Fact-Checking Sources</h3>
            <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-wider">
              {top_articles.length} References
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {top_articles.map((article, i) => (
              <a 
                key={i} 
                href={article.link} 
                target="_blank" 
                rel="noreferrer"
                className="glass-card overflow-hidden group hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col bg-black/60"
              >
                {article.image ? (
                  <div className="h-40 w-full overflow-hidden relative">
                    <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                ) : (
                  <div className="h-40 w-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <ArrowUpRight className="w-8 h-8 text-white/20" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow relative -mt-6">
                  <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/5 flex-grow flex flex-col shadow-xl">
                    <h4 className="font-bold text-sm leading-snug line-clamp-2 mb-4 group-hover:text-cyan-300 transition-colors">{article.title}</h4>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/40 flex items-center gap-1.5">
                        {i === 0 && <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />}
                        {article.source}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div variants={item} className="mt-4 flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-white/50 text-xs uppercase tracking-wider font-semibold">
        <AlertTriangle className="w-5 h-5 shrink-0 text-white/30" />
        <p className="leading-relaxed mt-0.5">{disclaimer}</p>
      </motion.div>

    </motion.div>
  );
}
