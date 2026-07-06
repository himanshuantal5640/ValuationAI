import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CircularScore({ score, decision }) {
  const [offset, setOffset] = useState(314.16);

  const getRecommendationDetails = (rec) => {
    const r = rec ? rec.toLowerCase() : "";
    if (r.includes("strong")) {
      return {
        color: "#10b981", // Emerald
        glow: "rgba(16, 185, 129, 0.25)",
        class: "text-emerald-400 border-emerald-500/40 bg-emerald-950/45 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      };
    }
    if (r.includes("watchlist")) {
      return {
        color: "#f59e0b", // Amber
        glow: "rgba(245, 158, 11, 0.2)",
        class: "text-amber-400 border-amber-500/40 bg-amber-950/45 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
      };
    }
    if (r.includes("pass")) {
      return {
        color: "#ef4444", // Rose
        glow: "rgba(239, 68, 68, 0.25)",
        class: "text-rose-400 border-rose-500/40 bg-rose-950/45 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
      };
    }
    // Default: Invest
    return {
      color: "#22c55e", // Green
      glow: "rgba(34, 197, 94, 0.2)",
      class: "text-green-400 border-green-500/40 bg-green-950/45 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
    };
  };

  const details = getRecommendationDetails(decision);

  useEffect(() => {
    const progress = Math.min(Math.max(score, 0), 100) / 100;
    const circumference = 2 * Math.PI * 50; // 314.159
    setOffset(circumference - progress * circumference);
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-44 h-44">
        {/* Ambient backing glow */}
        <div 
          className="absolute inset-2 rounded-full blur-xl scale-95 transition-all duration-1000"
          style={{ backgroundColor: details.glow }}
        />

        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            className="stroke-gray-800/80"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            stroke={details.color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="314.16"
            initial={{ strokeDashoffset: 314.16 }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Text label inside circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-white font-mono"
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Score / 100</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-base font-bold tracking-wider uppercase px-8 py-2 rounded-full border ${details.class}`}
        >
          {decision}
        </motion.span>
      </div>
    </div>
  );
}
