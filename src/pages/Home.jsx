import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';
import { Search, Loader2 } from 'lucide-react'; // Using the icons you installed

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins } = useCrypto();
  const [search, setSearch] = useState('');
  const inputRef = useRef(null); // The "Laser Pointer"

  // REQUIREMENT: Search Interaction (useRef)
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // REQUIREMENT: Controlled Forms (Search Filter)
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // REQUIREMENT: Loading State
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-cyan-400">
      <Loader2 className="animate-spin mb-2" size={48} />
      <p className="tracking-widest">SCANNING BLOCKCHAIN...</p>
    </div>
  );

  if (error) return <div className="p-10 text-red-500 bg-gray-900 min-h-screen">Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a cryptocurrency..."
          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500 transition-colors shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <span className="font-bold">{coin.name}</span>
              </div>
              {/* REQUIREMENT: State-Based Styling (Green/Red) */}
              <div className="text-right">
                <p className="font-mono">${coin.current_price.toLocaleString()}</p>
                <p className={`text-sm ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl">
        <MarketChart />
      </div>
    </div>
  );
};

export default Home;