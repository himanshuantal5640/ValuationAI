import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiTrendingUp, FiTrendingDown, FiClock, FiActivity } from 'react-icons/fi';

const QUICK_EXAMPLES = ["Nvidia", "Tesla", "Apple", "Microsoft", "Amazon"];

export default function Home({ onSearch, history }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-[85vh]">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-glow pointer-events-none z-0" />

      {/* Hero Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center relative z-10 max-w-3xl space-y-6"
      >
        <motion.div 
          variants={itemVariants} 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold tracking-wider uppercase mb-2 animate-pulse-glow"
        >
          <FiActivity className="text-sm" /> Smart Equity Research
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-violet-400 leading-none"
        >
          AI Investment <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">Research Agent</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
        >
          Conduct institutional-grade, multi-stage equity research in seconds. Automated intelligence synthesizing financials, news, and risk modeling.
        </motion.p>

        {/* Search Bar Box */}
        <motion.form 
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto mt-10 relative"
        >
          <div className="relative group">
            {/* Ambient outer glow behind search */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-500 rounded-2xl blur opacity-35 group-focus-within:opacity-75 transition duration-500" />
            
            <div className="relative flex items-center bg-gray-950/80 rounded-xl border border-white/10 group-focus-within:border-violet-500/40 p-2 overflow-hidden">
              <FiSearch className="text-gray-400 text-xl ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Enter stock name (e.g. Tesla, Nvidia, Apple)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 text-base md:text-lg focus:outline-none px-4 py-3 font-light"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-lg cursor-pointer transition-all active:scale-95 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed shrink-0 btn-shine"
              >
                Analyze Company
              </button>
            </div>
          </div>
        </motion.form>

        {/* Quick presets */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-2.5 mt-6"
        >
          <span className="text-xs text-gray-500 font-medium mr-1 uppercase tracking-wider">Hot Tickers:</span>
          {QUICK_EXAMPLES.map((company) => (
            <button
              key={company}
              onClick={() => onSearch(company)}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-white/5 hover:border-violet-500/30 bg-white/5 hover:bg-violet-500/10 text-gray-300 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              {company}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* History log block */}
      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-20 relative z-10"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
            <FiClock /> Recent Analysis Dossiers
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {history.slice(0, 6).map((item, index) => {
              const rec = item.recommendation || item.decision || "Watchlist";
              const isInvest = rec.toLowerCase().includes("invest");
              const scoreValue = item.scores?.total || item.score || 0;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  onClick={() => onSearch(item.company, item)} // Loads mock analysis instantly!
                  className="glass-card hover:border-violet-500/30 rounded-xl p-5 border border-white/5 cursor-pointer flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">{item.company}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isInvest 
                          ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' 
                          : 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                      }`}>
                        {rec}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-light mb-4">
                      {item.overview}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Score Assessment</span>
                    <div className="flex items-center gap-2">
                      {isInvest ? (
                        <FiTrendingUp className="text-emerald-400 text-xs" />
                      ) : (
                        <FiTrendingDown className="text-rose-400 text-xs" />
                      )}
                      <span className={`text-sm font-bold ${isInvest ? 'text-emerald-400' : 'text-rose-400'}`}>{scoreValue}/100</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
