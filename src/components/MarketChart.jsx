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
                scale="auto" // Change to "log" if you want to see small coins better
                domain={[0, 'auto']}
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                tickFormatter={(value) => `$${value.toLocaleString()}`} 
                width={80}
                />

            <Tooltip 
                cursor={{ fill: 'rgba(34, 211, 238, 0.1)' }}
                contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '12px',
                    color: '#fff' 
                }}
                itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
            />
        <Bar dataKey="price" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;