import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins, currency } = useCrypto();

  // Mapping currency codes to symbols
  const currencySymbols = {
    USD: '$',
    PHP: '₱',
    EUR: '€',
    JPY: '¥',
    GBP: '£'
  };

  const currentSymbol = currencySymbols[currency] || '$';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={coins} 
        margin={{ top: 10, right: 10, left: 0, bottom: -15 }} // Negative margin kills the gap
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
        
        <XAxis dataKey="symbol" hide /> 

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
          itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
        />

        <Bar 
          dataKey="current_price" 
          fill="#22d3ee" 
          radius={[6, 6, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;