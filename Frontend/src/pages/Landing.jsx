import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, FiCpu, FiShield, FiFileText, FiClock, 
  FiChevronRight, FiGrid, FiHexagon, FiAward, FiPlay 
} from 'react-icons/fi';

export default function Landing({ onLaunch, isLoggedIn }) {
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
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <div className="w-full relative overflow-x-hidden min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-radial-glow pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-violet-950/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider animate-pulse-glow"
          >
            <FiCpu className="animate-spin-slow" /> Next-Generation Equity Research
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-violet-400 leading-tight"
          >
            Orchestrated AI <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">Investment Research</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Valuation.AI automates multi-stage fundamental analysis. Chaining search, sentiment, and financial modeling agents together to build institutional-grade dossiers.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button
              onClick={onLaunch}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-bold text-base cursor-pointer shadow-lg shadow-violet-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 btn-shine"
            >
              <span>{isLoggedIn ? "Open Research Terminal" : "Get Started Free"}</span>
              <FiChevronRight />
            </button>
            
            <a
              href="#features"
              className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-gray-300 hover:text-white font-bold text-base transition-all active:scale-95"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Teasers */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">Comprehensive Toolkit</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Engineered for High-Conviction Deciders</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto font-light">
            Go beyond simple chatbot queries. Valuation.AI features a modular suite of tools optimized for deep due diligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FiHexagon className="text-violet-400 text-2xl" />,
              title: "100-Point Scoring Engine",
              desc: "Quantitative scoring segmented across Market Position, Growth vectors, Financials, Sentiment, and Risk coverage."
            },
            {
              icon: <FiGrid className="text-emerald-400 text-2xl" />,
              title: "SWOT Quadrant Matrices",
              desc: "Internal strengths and weaknesses mapped against external market opportunities and macroeconomic threats."
            },
            {
              icon: <FiClock className="text-blue-400 text-2xl" />,
              title: "Attribution Timeline",
              desc: "Recent news items filtered and structured with date and publisher source badges to eliminate LLM hallucinations."
            },
            {
              icon: <FiAward className="text-amber-400 text-2xl" />,
              title: "Warren Buffett Checklist",
              desc: "Evaluates corporate moats and margins of safety through a dedicated value-investing framework."
            },
            {
              icon: <FiCpu className="text-fuchsia-400 text-2xl" />,
              title: "Chained Agent Network",
              desc: "5 distinct agents coordinate on a stateful LangGraph connection, executing dedicated sub-prompts in sequence."
            },
            {
              icon: <FiFileText className="text-rose-400 text-2xl" />,
              title: "High-Fidelity PDF Export",
              desc: "Captures full dashboard views cleanly using html2canvas-pro to compile styled, multi-page PDFs."
            }
          ].map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-start relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-violet-500/30 transition-colors">
                {feat.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{feat.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow Showcase */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-violet-500/10 relative overflow-hidden bg-gradient-to-r from-violet-950/10 to-transparent">
          <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">Graph Orchestration</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">Under The Hood: Chained LangGraph Workflow</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light mb-6">
              Requests pass through specialized research agents that cross-reference data. The output is structured, verified, and saved to the user's secure cache history.
            </p>
            
            <div className="space-y-4">
              {[
                "Research Agent maps the business model and economic moats.",
                "News Agent pulls recent articles with verified citations.",
                "Risk Agent grades competitive, regulatory, and financial threats.",
                "Investment Agent parses reports into SWOT vectors.",
                "Decision Agent assigns category scores and Buffett perspective."
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-400 flex items-center justify-center font-mono font-bold shrink-0">{idx+1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mock Pricing Tiers */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">Flexible Plans</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">SaaS Pricing Tiers</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto font-light">
            Start analyzing for free and scale to institutional levels as needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Sandbox */}
          <div className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-300">Free Sandbox</h4>
              <p className="text-xs text-gray-500 mt-1 font-light">Great for retail stock search</p>
              <div className="text-3xl font-extrabold text-white mt-4 mb-6">$0 <span className="text-xs font-light text-gray-500">/ forever</span></div>
              <ul className="space-y-3.5 text-xs text-gray-400 font-light">
                <li className="flex items-center gap-2">✓ 10 searches per month</li>
                <li className="flex items-center gap-2">✓ Standard 5-Agent Pipeline</li>
                <li className="flex items-center gap-2">✓ SWOT Analysis</li>
                <li className="flex items-center gap-2">✗ PDF Exporter</li>
              </ul>
            </div>
            <button onClick={onLaunch} className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-xs font-bold mt-8 cursor-pointer transition-all btn-shine">
              Launch Free Sandbox
            </button>
          </div>

          {/* Pro Premium */}
          <div className="glass-card rounded-2xl p-8 border border-violet-500/30 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-violet-500/5">
            <div className="absolute top-0 right-0 bg-violet-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Popular</div>
            <div>
              <h4 className="text-lg font-bold text-white">Professional</h4>
              <p className="text-xs text-violet-400 mt-1 font-light">Designed for active investors</p>
              <div className="text-3xl font-extrabold text-white mt-4 mb-6">$29 <span className="text-xs font-light text-gray-500">/ user / mo</span></div>
              <ul className="space-y-3.5 text-xs text-gray-300 font-light">
                <li className="flex items-center gap-2">✓ Unlimited searches</li>
                <li className="flex items-center gap-2">✓ Advanced Gemini LLM models</li>
                <li className="flex items-center gap-2">✓ Custom PDF Exporters</li>
                <li className="flex items-center gap-2">✓ Persistent Local History</li>
              </ul>
            </div>
            <button onClick={onLaunch} className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white mt-8 cursor-pointer transition-all shadow-md shadow-violet-600/10 btn-shine">
              Get Started Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="glass-card rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-300">Enterprise</h4>
              <p className="text-xs text-gray-500 mt-1 font-light">Custom integrations for desks</p>
              <div className="text-3xl font-extrabold text-white mt-4 mb-6">Custom <span className="text-xs font-light text-gray-500">/ bespoke</span></div>
              <ul className="space-y-3.5 text-xs text-gray-400 font-light">
                <li className="flex items-center gap-2">✓ Custom database RAG integrations</li>
                <li className="flex items-center gap-2">✓ Dedicated API keys</li>
                <li className="flex items-center gap-2">✓ SLA support</li>
                <li className="flex items-center gap-2">✓ On-premise deployments</li>
              </ul>
            </div>
            <button onClick={onLaunch} className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-xs font-bold mt-8 cursor-pointer transition-all btn-shine">
              Contact Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
