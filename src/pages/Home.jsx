import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';
import { Search, Loader2, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins, currency } = useCrypto(); 
  const [search, setSearch] = useLocalStorage('cryptoSearch', '');
  const inputRef = useRef(null);

  const getSymbol = (code) => {
    const symbols = { USD: '$', EUR: '€', PHP: '₱', JPY: '¥' };
    return symbols[code] || '$';
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Requirement: Visible Loading State
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-950">
      {/* Brand Icon with Glow */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl">
          <Activity className="text-cyan-400 animate-bounce" size={48} strokeWidth={2.5} />
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        <h2 className="text-white font-black uppercase tracking-[0.4em] text-xl animate-pulse">
          Initializing Sync
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
            Establishing Secure Connection...
          </p>
        </div>
      </div>

      {/* The Ideal Progress Bar */}
      <div className="mt-8 w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full animate-loading-slide"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
      <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-[2rem] text-center max-w-md">
        <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="text-rose-500 rotate-45" size={32} />
        </div>
        <h2 className="text-white font-black uppercase tracking-tight text-xl mb-2">Sync Interrupted</h2>
        <p className="text-rose-200/60 text-sm font-mono mb-6">
          {error === 'Failed to fetch' ? 'API Rate limit exceeded or Network Error. Please wait 60 seconds.' : error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-rose-500 hover:text-white transition-all uppercase text-xs tracking-widest"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 overflow-x-hidden">
      {/* Search Section */}
      <div className="flex justify-center mb-8 px-2"> 
        <div className="relative w-full md:max-w-md group">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" 
            size={18} 
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search assets..."
            className="w-full py-2 pl-11 pr-4 rounded-xl bg-slate-800/40 border border-slate-700/50 
                      focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none 
                      transition-all text-sm text-white placeholder:text-slate-500 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-12">
        {filteredCoins.map(coin => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          return (
            <div key={coin.id} className="group p-4 sm:p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
              <div className="flex justify-between items-center gap-2"> {/* Changed items-start to items-center */}
                <div className="flex items-center gap-3 min-w-0"> {/* min-w-0 is the secret to allowing text truncation */}
                  <div className="p-1.5 md:p-2 bg-slate-900 rounded-lg shrink-0">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="min-w-0"> 
                    <h3 className="font-bold text-slate-100 text-sm md:text-base truncate">{coin.name}</h3>
                    <p className="text-[10px] md:text-xs font-mono text-slate-500 uppercase truncate">{coin.symbol}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm md:text-lg font-bold text-white">
                    {getSymbol(currency)}{coin.current_price.toLocaleString()}
                  </p>
                  <div className={`flex items-center justify-end gap-1 text-[10px] md:text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Market Chart Container */}
      <div className="bg-slate-800/30 p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-700/50 shadow-2xl backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 md:h-8 bg-cyan-500 rounded-full"></div>
          <h2 className="text-lg md:text-2xl font-bold text-white uppercase tracking-tight">Market Depth ({currency})</h2>
        </div>
        {/* FIX: Parent must have a defined height for Recharts */}
        <div className="h-[400px] w-full relative">
          <MarketChart />
        </div>
      </div>
    </div>
  );
};

export default Home;