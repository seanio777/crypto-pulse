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
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        // categoryGap makes the bars feel closer together if needed
        categoryGap="20%" 
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
        <XAxis 
          dataKey="symbol" 
          tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} 
          tickLine={false}
          axisLine={false}
          dy={10}
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
          formatter={(value) => [`${currentSymbol}${value.toLocaleString()}`, "Price"]}
        />
        <Bar 
          dataKey="current_price" 
          fill="#22d3ee" 
          radius={[6, 6, 0, 0]} 
          // INCREASED BAR WIDTH HERE
          barSize={60} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;