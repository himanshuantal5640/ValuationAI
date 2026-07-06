import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Architecture from './pages/Architecture';
import Profile from './pages/Profile';
import WorkflowTimeline from './components/WorkflowTimeline';
import { analyzeCompanyStream, fetchHistory } from './services/api';
import { MOCK_HISTORY } from './services/mockData';
import { 
  FiTrendingUp, FiActivity, FiAlertCircle, FiSearch, 
  FiCpu, FiClock, FiFileText, FiChevronRight, FiMenu, FiX, 
  FiUser, FiLogOut, FiLogIn
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'auth' | 'home' | 'loading' | 'result' | 'architecture'
  const [user, setUser] = useState(null);
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentStep, setCurrentStep] = useState('research');
  const [logs, setLogs] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load session from LocalStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('valuation_ai_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setView('home');
      } catch (e) {
        localStorage.removeItem('valuation_ai_user');
        setView('landing');
      }
    } else {
      setView('landing');
    }
  }, []);

  // Fetch history for the logged-in user or fallback to seed mocks
  const loadUserHistory = async (userId) => {
    try {
      const data = await fetchHistory(userId);
      setHistory(data.length > 0 ? data : MOCK_HISTORY);
    } catch (e) {
      console.warn("Failed to load history from database, falling back to mocks.", e);
      setHistory(MOCK_HISTORY);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserHistory(user.id);
    } else {
      setHistory(MOCK_HISTORY);
    }
  }, [user]);

  // Global Auth Guard: if user is not logged in, restrict views to 'landing' or 'auth'
  useEffect(() => {
    if (!user && view !== 'landing' && view !== 'auth') {
      setView('landing');
    }
  }, [user, view]);

  // Handle URL query parameters for sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const companyParam = params.get('company');
    if (companyParam && history.length > 0) {
      // Guard: prompt login before allowing report views via share links
      if (!user) {
        setView('auth');
        return;
      }
      const match = history.find(
        h => h.company.toLowerCase() === companyParam.trim().toLowerCase()
      );
      if (match) {
        setAnalysisResult(match);
        setView('result');
      } else {
        handleSearch(companyParam.trim());
      }
    }
  }, [history, user]);

  const handleSearch = (companyName, preloadedData = null) => {
    setCurrentCompany(companyName);
    setErrorMsg('');
    setMobileMenuOpen(false);

    if (preloadedData) {
      setAnalysisResult(preloadedData);
      setView('result');
      window.history.pushState({}, '', `?company=${encodeURIComponent(preloadedData.company)}`);
      return;
    }

    // Start streaming execution
    setView('loading');
    setCurrentStep('research');
    setLogs([`Initializing agent pipeline for ${companyName}...`]);
    setAnalysisResult(null);

    window.history.pushState({}, '', `?company=${encodeURIComponent(companyName)}`);

    analyzeCompanyStream(companyName, {
      userId: user ? user.id : null,
      onStatus: (status) => {
        if (status.node.includes('research')) {
          setCurrentStep('research');
        } else if (status.node.includes('news')) {
          setCurrentStep('news');
        } else if (status.node.includes('risk')) {
          setCurrentStep('risks');
        } else if (status.node.includes('investment')) {
          setCurrentStep('investment');
        } else if (status.node.includes('decision')) {
          setCurrentStep('decision');
        }
        setLogs(prev => [...prev, status.message]);
      },
      onResult: (resultData) => {
        setAnalysisResult(resultData);
        // Reload user history from database to refresh sidebar
        if (user) {
          loadUserHistory(user.id);
        }
      },
      onError: (err) => {
        console.error("Stream analysis error:", err);
        setErrorMsg(err.message || "An unexpected error occurred during research node compilation.");
        setCurrentStep('error');
      },
      onComplete: () => {
        setCurrentStep('complete');
        setTimeout(() => {
          setView('result');
        }, 1200);
      }
    });
  };

  const handleBackToHome = () => {
    setView(user ? 'home' : 'landing');
    setAnalysisResult(null);
    setCurrentCompany('');
    setMobileMenuOpen(false);
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleAuthSuccess = (loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem('valuation_ai_user', JSON.stringify(loggedUser));
    setView('home');
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('valuation_ai_user');
    setView('landing');
    setAnalysisResult(null);
    setCurrentCompany('');
    window.history.pushState({}, '', window.location.pathname);
  };

  const selectHistoryItem = (item) => {
    handleSearch(item.company, item);
  };

  const showSidebar = view !== 'landing' && view !== 'auth';

  return (
    <div className="flex min-h-screen text-gray-100 bg-[#030712] font-sans relative overflow-x-hidden">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-950/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* PERSISTENT SIDEBAR - DESKTOP */}
      {showSidebar && (
        <aside className="w-64 bg-gray-950/80 backdrop-blur-md border-r border-white/5 flex flex-col justify-between hidden md:flex fixed top-0 left-0 bottom-0 z-40">
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Brand Logo */}
            <div 
              onClick={handleBackToHome}
              className="h-16 px-6 flex items-center gap-2 border-b border-white/5 cursor-pointer hover:bg-white/2"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <FiTrendingUp className="text-white text-sm" />
              </div>
              <span className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                VALUATION.<span className="text-violet-400 font-black">AI</span>
              </span>
            </div>

            {/* Primary Navigation */}
            <nav className="p-4 space-y-1">
              <button
                onClick={handleBackToHome}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  view === 'home' 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/15' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FiSearch />
                <span>Search Terminal</span>
              </button>

              <button
                onClick={() => { setView('architecture'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  view === 'architecture' 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/15' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FiCpu />
                <span>System Topology</span>
              </button>

              {analysisResult && (
                <button
                  onClick={() => { setView('result'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    view === 'result' 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/15' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FiFileText />
                    <span className="truncate max-w-[120px]">{analysisResult.company} Report</span>
                  </div>
                  <FiChevronRight className="text-xs shrink-0" />
                </button>
              )}
            </nav>

            {/* Search History Logs */}
            <div className="p-4 border-t border-white/5 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-1.5 px-3">
                <FiClock /> Recent Dossiers
              </div>
              
              <div className="space-y-1 overflow-y-auto max-h-[45vh]">
                {history.map((item, idx) => {
                  const rec = item.recommendation || item.decision || "Watchlist";
                  const isInvest = rec.toLowerCase().includes("invest");
                  return (
                    <button
                      key={idx}
                      onClick={() => selectHistoryItem(item)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-xs flex flex-col gap-1 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-300 group-hover:text-white truncate max-w-[130px]">{item.company}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          isInvest ? 'text-emerald-400 bg-emerald-500/5' : 'text-amber-400 bg-amber-500/5'
                        }`}>
                          {item.scores?.total || item.score}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* User Footer Panel with Profile Card & Logout */}
          <div className="p-4 border-t border-white/5 flex flex-col gap-2">
            {user ? (
              <div className="space-y-2">
                <button
                  onClick={() => setView('profile')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition-all border cursor-pointer ${
                    view === 'profile'
                      ? 'bg-violet-600 border-violet-500 text-white font-semibold shadow-lg shadow-violet-600/15'
                      : 'glass-input border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FiUser className="shrink-0 text-sm" />
                  <div className="truncate flex-1">
                    <p className="font-semibold truncate leading-tight text-gray-200">{user.name || "My Account"}</p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{user.email}</p>
                  </div>
                </button>
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-950/20 border border-red-500/10 hover:bg-red-500/10 text-xs font-semibold text-red-400 cursor-pointer transition-colors btn-shine"
                >
                  <FiLogOut /> Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setView('auth')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white cursor-pointer transition-colors btn-shine"
              >
                <FiLogIn /> Sign In to Terminal
              </button>
            )}
          </div>
        </aside>
      )}

      {/* MOBILE HEADER & CONTENT PANEL */}
      <div className={`flex-1 flex flex-col min-w-0 ${showSidebar ? 'md:pl-64' : ''}`}>
        {showSidebar && (
          <header className="h-16 border-b border-white/5 bg-gray-950/50 backdrop-blur-md flex items-center justify-between px-4 md:hidden sticky top-0 z-40 w-full">
            <div onClick={handleBackToHome} className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <FiTrendingUp className="text-white text-sm" />
              </div>
              <span className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                VALUATION.<span className="text-violet-400 font-black">AI</span>
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </header>
        )}

        {/* MOBILE SIDEBAR MENU OVERLAY */}
        <AnimatePresence>
          {showSidebar && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 bg-[#030712] border-b border-white/10 z-30 p-4 md:hidden flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
            >
              <nav className="flex flex-col gap-2">
                <button
                  onClick={handleBackToHome}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    view === 'home' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FiSearch /> Search Terminal
                </button>
                
                <button
                  onClick={() => { setView('architecture'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    view === 'architecture' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FiCpu /> System Topology
                </button>

                {analysisResult && (
                  <button
                    onClick={() => { setView('result'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      view === 'result' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <FiFileText /> {analysisResult.company} Brief
                  </button>
                )}
              </nav>

              {user && (
                <div className="border-t border-white/5 pt-3">
                  <div className="flex items-center gap-2 px-3 mb-3 text-xs text-gray-400 truncate">
                    <FiUser /> <span>{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-950/20 border border-red-500/10 hover:bg-red-500/10 text-xs font-semibold text-red-400 cursor-pointer"
                  >
                    <FiLogOut /> Log Out
                  </button>
                </div>
              )}

              <div className="border-t border-white/5 pt-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 px-3 flex items-center gap-1.5">
                  <FiClock /> Recent Dossiers
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectHistoryItem(item)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-xs flex justify-between items-center cursor-pointer"
                    >
                      <span className="text-gray-300 font-semibold">{item.company}</span>
                      <span className="text-[10px] text-violet-400 font-mono font-bold">{item.scores?.total || item.score}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN DISPLAY PANEL */}
        <main className="flex-1 flex flex-col justify-start relative z-10 w-full min-h-screen">
          <AnimatePresence mode="wait">
            {view === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Landing 
                  onLaunch={() => setView(user ? 'home' : 'auth')} 
                  isLoggedIn={!!user} 
                />
              </motion.div>
            )}

            {view === 'auth' && (
              <motion.div
                key="auth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Auth 
                  onAuthSuccess={handleAuthSuccess} 
                  onBackToLanding={() => setView('landing')} 
                />
              </motion.div>
            )}

            {view === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <Home onSearch={handleSearch} history={history} />
              </motion.div>
            )}

            {view === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex-1 flex flex-col items-center justify-center py-20 px-4"
              >
                {currentStep === 'error' ? (
                  <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-rose-500/20 text-center space-y-6">
                    <FiAlertCircle className="text-rose-500 text-5xl mx-auto animate-bounce" />
                    <h3 className="text-xl font-bold text-white">Pipeline Execution Failed</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">{errorMsg}</p>
                    
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={() => handleSearch(currentCompany)}
                        className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-all"
                      >
                        Retry Analysis
                      </button>
                      <button
                        onClick={handleBackToHome}
                        className="text-xs font-semibold px-6 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                      >
                        Return to Search
                      </button>
                    </div>
                  </div>
                ) : (
                  <WorkflowTimeline currentStep={currentStep} logs={logs} />
                )}
              </motion.div>
            )}

            {view === 'result' && analysisResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Dashboard data={analysisResult} onBack={handleBackToHome} />
              </motion.div>
            )}

            {view === 'architecture' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Architecture />
              </motion.div>
            )}

            {view === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Profile 
                  user={user} 
                  history={history} 
                  onBack={handleBackToHome} 
                  onSelectDossier={(item) => selectHistoryItem(item)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Global Footer */}
        <footer className="w-full py-6 text-center border-t border-white/5 text-[10px] text-gray-600 relative z-10 bg-gray-950/20">
          <p>© {new Date().getFullYear()} Valuation.AI - Institutional Agentic Research platforms. Data structured in real-time via Tavily.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
