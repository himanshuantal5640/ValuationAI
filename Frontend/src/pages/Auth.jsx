import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loginUser, signupUser } from '../services/api';
import { FiTrendingUp, FiMail, FiLock, FiAlertCircle, FiLoader } from 'react-icons/fi';

export default function Auth({ onAuthSuccess, onBackToLanding }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email || !password) {
      setErrorMsg("Please fill out all fields.");
      return;
    }

    if (!isLogin && password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const data = await loginUser(email, password);
        onAuthSuccess(data.user);
      } else {
        const data = await signupUser(email, password);
        // Automatically log in the user upon successful signup
        const loginData = await loginUser(email, password);
        onAuthSuccess(loginData.user);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-radial-glow pointer-events-none z-0" />

      {/* Main Glass Form Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card rounded-2xl p-8 border border-white/10 relative z-10 shadow-2xl"
      >
        {/* Brand header */}
        <div 
          onClick={onBackToLanding}
          className="flex flex-col items-center gap-2 cursor-pointer select-none mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <FiTrendingUp className="text-white text-xl" />
          </div>
          <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            VALUATION.<span className="text-violet-400 font-black">AI</span>
          </span>
          <p className="text-[10px] text-gray-500 font-light mt-1">Institutional Equity Research Suite</p>
        </div>

        <h3 className="text-xl font-bold text-center text-white mb-6">
          {isLogin ? "Sign In to Terminal" : "Register Search Seat"}
        </h3>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <FiAlertCircle className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold">Email Address</label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 text-gray-500" />
              <input
                type="email"
                placeholder="your.name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 focus:border-violet-500/50 rounded-lg text-sm px-10 py-3 text-white placeholder-gray-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold">Security Password</label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 text-gray-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 focus:border-violet-500/50 rounded-lg text-sm px-10 py-3 text-white placeholder-gray-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed font-bold text-sm text-white shadow-lg shadow-violet-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-6"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" /> Verifying...
              </>
            ) : (
              <span>{isLogin ? "Access Terminal" : "Register Free Seat"}</span>
            )}
          </button>
        </form>

        {/* Toggle link */}
        <div className="mt-6 text-center text-xs">
          <span className="text-gray-500">
            {isLogin ? "New to the platform? " : "Already registered? "}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
            }}
            className="text-violet-400 hover:text-violet-300 font-semibold underline cursor-pointer"
          >
            {isLogin ? "Register a free account" : "Sign in here"}
          </button>
        </div>

        {/* Back link */}
        <div className="mt-4 text-center">
          <button
            onClick={onBackToLanding}
            className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
          >
            Return to Landing Page
          </button>
        </div>
      </motion.div>
    </div>
  );
}
