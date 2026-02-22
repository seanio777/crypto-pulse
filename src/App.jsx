import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        {/* Tailwind CSS Styling */}
        <nav className="p-5 bg-indigo-900 text-white flex justify-between items-center shadow-lg">
          <h1 className="text-xl font-bold tracking-widest text-cyan-400">CRYPTO-PULSE</h1>
          <div className="flex gap-6 items-center">
            <Link to="/" className="hover:text-cyan-400 transition">Market</Link>
            <Link to="/analysis" className="hover:text-cyan-400 transition">Analysis</Link>
            {/* Simple Currency Toggle for Context Logic */}
            <button 
              onClick={() => alert("Currency logic integrated in Context!")}
              className="bg-gray-700 px-3 py-1 rounded text-xs"
            >
              USD
            </button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}
export default App;
