import { useState } from 'react'; // Add useState
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import { CryptoProvider, useCrypto } from './context/CryptoContext';
import { Activity, LayoutDashboard, BarChart3, Settings, X } from 'lucide-react';

function AppContent() {
  const { currency, setCurrency } = useCrypto();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-cyan-500 rounded-xl p-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Activity className="text-slate-950" size={24} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center tracking-tighter">
                <span className="text-2xl font-black text-white uppercase italic leading-none">Crypto</span>
                <span className="text-2xl font-light text-cyan-400 uppercase ml-1 leading-none">Pulse</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400">Market</Link>
            <Link to="/analysis" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400">Analysis</Link>
            
            {/* FIXED SETTINGS BUTTON */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-all"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-[2rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase tracking-tight">Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Select Currency</p>
            <div className="grid grid-cols-2 gap-3">
              {['USD', 'PHP', 'EUR', 'JPY'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr);
                    setIsSettingsOpen(false);
                  }}
                  className={`py-3 rounded-xl font-bold transition-all border ${
                    currency === curr 
                    ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrap Content in Router and Provider
function App() {
  return (
    <CryptoProvider>
      <Router>
        <AppContent />
      </Router>
    </CryptoProvider>
  );
}

export default App;