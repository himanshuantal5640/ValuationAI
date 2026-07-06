import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCpu, FiServer, FiGlobe, FiDatabase, FiShuffle, 
  FiFileText, FiMessageSquare, FiAlertCircle, FiAward 
} from 'react-icons/fi';

const flowVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Architecture() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-radial-glow pointer-events-none z-0" />

      {/* Title Header */}
      <div className="text-center mb-16 relative z-10">
        <span className="text-xs font-bold tracking-widest text-violet-400 uppercase">Technical System Topography</span>
        <h1 className="text-4xl font-extrabold text-white mt-2">Valuation.AI Node Architecture</h1>
        <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto font-light">
          A high-fidelity visualization of our multi-agent orchestration showing request lifecycle from client-side SPA down to LLM decision modeling nodes.
        </p>
      </div>

      <motion.div 
        variants={flowVariants}
        initial="hidden"
        animate="show"
        className="space-y-12 relative z-10"
      >
        {/* Layer 1: Client Application */}
        <motion.div variants={cardVariants} className="flex flex-col items-center">
          <div className="glass-card rounded-xl p-5 border border-violet-500/20 w-full max-w-md flex items-center gap-4 hover:border-violet-500/40 transition-all shadow-[0_0_20px_rgba(139,92,246,0.05)]">
            <div className="w-12 h-12 rounded-lg bg-violet-600/10 flex items-center justify-center border border-violet-500/30">
              <FiGlobe className="text-violet-400 text-xl" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Vite React SPA (Frontend)</h4>
              <p className="text-xs text-gray-400 font-light mt-1">
                Framer Motion for dashboard transitions, Recharts/SVG circular score visualization, Axios / Fetch stream reader.
              </p>
            </div>
          </div>
          
          {/* Connecting SVG Arrow */}
          <div className="h-10 w-0.5 bg-gradient-to-b from-violet-500 to-indigo-500 my-2 animate-pulse" />
        </motion.div>

        {/* Layer 2: API gateway proxy */}
        <motion.div variants={cardVariants} className="flex flex-col items-center">
          <div className="glass-card rounded-xl p-5 border border-indigo-500/20 w-full max-w-md flex items-center gap-4 hover:border-indigo-500/40 transition-all shadow-[0_0_20px_rgba(99,102,241,0.05)]">
            <div className="w-12 h-12 rounded-lg bg-indigo-600/10 flex items-center justify-center border border-indigo-500/30">
              <FiServer className="text-indigo-400 text-xl" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Node.js Express API (Backend)</h4>
              <p className="text-xs text-gray-400 font-light mt-1">
                Serves CORS-enabled REST endpoints & streams JSON Lines chunks via Server-Sent Events (SSE) protocol.
              </p>
            </div>
          </div>

          <div className="h-10 w-0.5 bg-gradient-to-b from-indigo-500 to-fuchsia-500 my-2 animate-pulse" />
        </motion.div>

        {/* Layer 3: LangGraph Orchestrator */}
        <motion.div variants={cardVariants} className="flex flex-col items-center">
          <div className="glass-card rounded-xl p-5 border border-fuchsia-500/20 w-full max-w-md flex items-center gap-4 hover:border-fuchsia-500/40 transition-all shadow-[0_0_20px_rgba(217,70,239,0.05)]">
            <div className="w-12 h-12 rounded-lg bg-fuchsia-600/10 flex items-center justify-center border border-fuchsia-500/30">
              <FiShuffle className="text-fuchsia-400 text-xl" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">LangGraph StateGraph Workflow</h4>
              <p className="text-xs text-gray-400 font-light mt-1">
                Orchestrates state transition loops and memory channels. Feeds sequential contexts through specialized AI agent nodes.
              </p>
            </div>
          </div>

          <div className="h-10 w-0.5 bg-gradient-to-b from-fuchsia-500 to-pink-500 my-2 animate-pulse" />
        </motion.div>

        {/* Layer 4: Multi-Agent Nodes */}
        <motion.div variants={cardVariants} className="glass-card rounded-3xl p-8 border border-white/5 bg-gray-950/40">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">Stateful Agent Cluster</span>
            <h3 className="text-lg font-bold text-white mt-1">Chained Graph Node Execution</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Agent 1 */}
            <div className="glass-card bg-black/40 rounded-xl p-4 border border-white/5 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-3">
                <FiGlobe className="text-violet-400" />
              </div>
              <h5 className="text-xs font-bold text-white">1. Research Agent</h5>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Queries Tavily for profile briefs, core products, and market positions.
              </p>
            </div>

            {/* Agent 2 */}
            <div className="glass-card bg-black/40 rounded-xl p-4 border border-white/5 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3">
                <FiDatabase className="text-indigo-400" />
              </div>
              <h5 className="text-xs font-bold text-white">2. News Agent</h5>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Filters latest year news events, formatting titles, dates, and sources.
              </p>
            </div>

            {/* Agent 3 */}
            <div className="glass-card bg-black/40 rounded-xl p-4 border border-white/5 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-3">
                <FiAlertCircle className="text-fuchsia-400" />
              </div>
              <h5 className="text-xs font-bold text-white">3. Risk Agent</h5>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Evaluates macro, financial, regulatory, and competitor threat matrices.
              </p>
            </div>

            {/* Agent 4 */}
            <div className="glass-card bg-black/40 rounded-xl p-4 border border-white/5 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-3">
                <FiFileText className="text-pink-400" />
              </div>
              <h5 className="text-xs font-bold text-white">4. Investment Analyst</h5>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Synthesizes dossiers to generate a structured 4-quadrant SWOT analysis.
              </p>
            </div>

            {/* Agent 5 */}
            <div className="glass-card bg-black/40 rounded-xl p-4 border border-white/5 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                <FiAward className="text-emerald-400" />
              </div>
              <h5 className="text-xs font-bold text-white">5. Decision Agent</h5>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Computes category scores, value perspectives, and rationales.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
