import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins } = useCrypto();
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  // Requirement: Search Interaction (useRef "Laser Pointer")
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Requirement: Controlled Forms (Real-time filtering)
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-white animate-pulse">Scanning Blockchain...</div>;
  if (error) return <div className="p-10 text-red-400">Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a coin (e.g. Bitcoin)..."
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 mb-8 focus:ring-2 focus:ring-cyan-500 outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 mb-8">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="flex justify-between p-4 bg-gray-800 rounded-lg border-l-4 border-cyan-500">
            <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
            {/* Requirement: State-Based Styling (Green/Red) */}
            <span className={coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}>
              ${coin.current_price.toLocaleString()} 
              ({coin.price_change_percentage_24h.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>

      <MarketChart />
    </div>
  );
};

export default Home;