import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';
import { Search, Loader2, TrendingUp, TrendingDown } from 'lucide-react';

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins, currency } = useCrypto(); 
  const [search, setSearch] = useState('');
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
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-cyan-400">
      <Loader2 className="animate-spin mb-4" size={48} />
      <p className="tracking-[0.2em] font-bold animate-pulse uppercase">Syncing Market Data...</p>
    </div>
  );

  if (error) return <div className="p-10 text-red-400 bg-red-900/20 border border-red-900 m-8 rounded-xl text-center">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="relative mb-10 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search assets..."
          className="w-full p-4 pl-12 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-lg text-white placeholder:text-slate-600 shadow-inner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredCoins.map(coin => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          return (
            <div key={coin.id} className="group p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100">{coin.name}</h3>
                    <span className="text-xs font-mono text-slate-500 uppercase">{coin.symbol}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">
                    {getSymbol(currency)}{coin.current_price.toLocaleString()}
                  </p>
                  <div className={`flex items-center justify-end gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Market Chart Container */}
      <div className="bg-slate-800/30 p-8 rounded-[2rem] border border-slate-700/50 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Market Depth Analysis ({currency})</h2>
        </div>
        {/* FIX: Parent must have a defined height for Recharts */}
        <div className="h-[400px] w-full">
          <MarketChart />
        </div>
      </div>
    </div>
  );
};

export default Home;