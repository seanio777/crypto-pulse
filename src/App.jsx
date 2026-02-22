import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import { CryptoProvider } from './context/CryptoContext';
import { Activity, LayoutDashboard, BarChart3, Settings } from 'lucide-react';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          {/* Main Navigation Header */}
          <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              {/* PROFESSIONAL LOGO SECTION */}
              <Link to="/" className="flex items-center gap-3 group transition-all">
                <div className="bg-cyan-500 rounded-xl p-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-cyan-500/50 transition-all duration-300">
                  <Activity className="text-slate-950" size={24} strokeWidth={3} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center tracking-tighter">
                    <span className="text-2xl font-black text-white uppercase italic leading-none">
                      Crypto
                    </span>
                    <span className="text-2xl font-light text-cyan-400 uppercase ml-1 leading-none">
                      Pulse
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-0.5">
                    Terminal
                  </span>
                </div>
              </Link>

              {/* NAV LINKS */}
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">
                  <LayoutDashboard size={18} />
                  Market
                </Link>
                <Link to="/analysis" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">
                  <BarChart3 size={18} />
                  Analysis
                </Link>
                <div className="h-6 w-[1px] bg-slate-800 ml-2"></div>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </nav>

          {/* PAGE CONTENT */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;