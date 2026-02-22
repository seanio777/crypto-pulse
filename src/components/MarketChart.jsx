import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();

  // Transform raw JSON into Chart-friendly data
  const chartData = coins.map(coin => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  return (
    <div className="h-80 w-full p-4 bg-gray-800 rounded-xl mt-6">
      <h2 className="text-white mb-4">Price Comparison (USD)</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            tickFormatter={(value) => `$${value.toLocaleString()}`} // Adds $ and commas
            width={80}
            />
            <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#22d3ee' }}
            formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
            />
        <Bar dataKey="price" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;