import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins, currency } = useCrypto();

  const currencySymbols = { USD: '$', PHP: '₱', EUR: '€', JPY: '¥', GBP: '£' };
  const currentSymbol = currencySymbols[currency] || '$';

  if (!coins || coins.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={coins} 
        margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
        barGap={8}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
        
        <XAxis 
          dataKey="symbol" 
          // FIX: This makes the labels CAPITALIZED like the cards
          tickFormatter={(value) => value.toUpperCase()}
          tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} 
          tickLine={false}
          axisLine={false}
          dy={15} // Adds some space between the bars and the labels
        /> 
        
        <YAxis 
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${currentSymbol}${value.toLocaleString()}`}
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
          // Ensures Tooltip also shows Uppercase symbols
          labelFormatter={(label) => label.toUpperCase()}
          formatter={(value) => [`${currentSymbol}${value.toLocaleString()}`, "Price"]}
        />

        <Bar 
          dataKey="current_price" 
          fill="#22d3ee" 
          radius={[6, 6, 0, 0]} 
          barSize={65} // Thicker bars as requested
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;