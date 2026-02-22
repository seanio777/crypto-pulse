import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import { CryptoProvider, useCrypto } from './context/CryptoContext'; // Added useCrypto
import Settings from './pages/Settings';

// Helper component to avoid "useCrypto must be used within Provider" error
const Navbar = () => {
  const { currency } = useCrypto(); // Now we can safely grab the global state
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/80 border-b border-slate-800 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-black tracking-tighter text-cyan-400 hover:text-cyan-300 transition-colors">
        CRYPTO<span className="text-white">-PULSE</span>
      </Link>
      <div className="flex gap-8 items-center font-medium">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Market</Link>
        <Link to="/analysis" className="hover:text-cyan-400 transition-colors">Analysis</Link>
        <Link to="/settings" className="hover:text-cyan-400 transition-colors">Settings</Link>
        <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-xs font-bold border border-cyan-500/30">
          {currency}
        </span>
      </div>
    </nav>
  );
};

function App() {
  return (
    <CryptoProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
          <Navbar /> 
          <main className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CryptoProvider>
  );
}

export default App;