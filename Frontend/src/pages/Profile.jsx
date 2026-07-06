import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCalendar, FiAward, FiSearch, FiArrowLeft, FiActivity, FiClock } from 'react-icons/fi';

export default function Profile({ user, history, onBack, onSelectDossier }) {
  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown Date';

  // Calculate user statistics
  const userSearches = history.filter(s => s.userId === user?.id || !s.userId); // Including local mocks if no user-specific
  const totalSearches = userSearches.length;
  
  const avgScore = totalSearches > 0 
    ? Math.round(userSearches.reduce((acc, curr) => acc + (curr.scores?.total || curr.score || 0), 0) / totalSearches)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto space-y-8">
      {/* Return header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
      >
        <FiArrowLeft /> Return to Search
      </button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Profile Card Header */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden bg-gradient-to-r from-violet-950/10 to-transparent"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Avatar Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
            <FiUser className="text-white text-4xl" />
          </div>

          <div className="text-center md:text-left space-y-1.5 flex-1">
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">
              Research Seat Active
            </span>
            <h2 className="text-2xl font-extrabold text-white">{user?.name || "User Account"}</h2>
            <p className="text-sm text-gray-400 font-light">{user?.email}</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-5 border border-white/5 text-center space-y-1">
            <FiSearch className="text-violet-400 text-lg mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-white">{totalSearches}</div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Reports Compiled</div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/5 text-center space-y-1">
            <FiActivity className="text-emerald-400 text-lg mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-white">{avgScore}/100</div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Average Score</div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/5 text-center space-y-1">
            <FiAward className="text-amber-400 text-lg mx-auto mb-1" />
            <div className="text-lg font-extrabold text-white">Free Sandbox</div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Membership Level</div>
          </div>
        </motion.div>

        {/* Profile Info Details */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-white/5">
            Account Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <FiUser className="text-gray-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">User Name</p>
                <p className="text-white font-semibold">{user?.name || "Not Specified"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-gray-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                <p className="text-white font-semibold">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar className="text-gray-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Joined Seat</p>
                <p className="text-white font-semibold">{joinDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiAward className="text-gray-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Access Rights</p>
                <p className="text-white font-semibold">Standard Sandbox API</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Search Logs */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
            <FiClock />
            <span>Search History Log</span>
          </h3>

          {userSearches.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-6">No reports generated yet.</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {userSearches.map((item, idx) => {
                const rec = item.recommendation || item.decision || "Watchlist";
                const isInvest = rec.toLowerCase().includes("invest");
                return (
                  <div 
                    key={idx}
                    className="p-3 bg-black/20 hover:bg-white/5 rounded-xl border border-white/5 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{item.company}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Assessed: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Today'}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                        isInvest ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      }`}>
                        {rec}
                      </span>
                      <button
                        onClick={() => onSelectDossier(item)}
                        className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-[10px] cursor-pointer transition-colors btn-shine"
                      >
                        Inspect Brief
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
