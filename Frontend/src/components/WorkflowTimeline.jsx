import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiCheck, FiPlay, FiAlertCircle } from 'react-icons/fi';

const STEPS = [
  { id: 'research', label: 'Company Research Agent', desc: 'Analyzing overview, business model, and competitive moats' },
  { id: 'news', label: 'News Intelligence Agent', desc: 'Gathering major news events, earnings updates, and citations' },
  { id: 'risks', label: 'Risk Assessment Agent', desc: 'Evaluating competitor, financial, and regulatory threat domains' },
  { id: 'investment', label: 'Investment Analyst Agent', desc: 'Compiling SWOT matrices and performing intermediate synthesis' },
  { id: 'decision', label: 'Decision Board Agent', desc: 'Assigning scores, value perspectives, and final verdict' }
];

export default function WorkflowTimeline({ currentStep, logs }) {
  const getStepStatus = (stepId, index) => {
    const stepIds = STEPS.map(s => s.id);
    const currentIndex = stepIds.indexOf(currentStep);
    const targetIndex = index;

    if (currentStep === 'error') return 'error';
    if (currentStep === 'complete') return 'completed';
    
    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'running';
    return 'idle';
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden border border-violet-500/20">
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-violet-400">
        <FiLoader className="animate-spin text-violet-400" />
        <span>Executing AI Agent Node Network</span>
      </h3>

      <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
        {STEPS.map((step, index) => {
          const status = getStepStatus(step.id, index);
          
          let icon = <div className="w-2 h-2 rounded-full bg-white/20" />;
          let iconBg = "bg-white/5 border-white/10";
          let textColor = "text-gray-500";
          let labelColor = "text-gray-400";

          if (status === 'completed') {
            icon = <FiCheck className="text-emerald-400 w-4 h-4" />;
            iconBg = "bg-emerald-500/15 border-emerald-500/30";
            textColor = "text-emerald-400";
            labelColor = "text-gray-200";
          } else if (status === 'running') {
            icon = <FiLoader className="text-violet-400 w-4 h-4 animate-spin" />;
            iconBg = "bg-violet-500/15 border-violet-500/30 animate-pulse-glow";
            textColor = "text-violet-400 font-medium";
            labelColor = "text-white font-medium";
          } else if (status === 'error') {
            icon = <FiAlertCircle className="text-rose-500 w-4 h-4" />;
            iconBg = "bg-rose-500/15 border-rose-500/30";
            textColor = "text-rose-400";
          }

          return (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-4 relative z-10"
            >
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${iconBg} transition-all duration-300`}>
                {icon}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex justify-between items-center">
                  <h4 className={`text-sm ${labelColor}`}>{step.label}</h4>
                  <span className={`text-xs uppercase tracking-wider ${textColor}`}>
                    {status === 'running' ? 'Active' : status === 'completed' ? 'Done' : 'Pending'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {logs.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Live Log Stream</div>
          <div className="glass-card bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-[11px] text-emerald-400 max-h-36 overflow-y-auto space-y-2">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-gray-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-emerald-400/90 leading-relaxed">{log}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
