import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins, currency } = useCrypto();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currencySymbols = { USD: '$', PHP: '₱', EUR: '€', JPY: '¥', GBP: '£' };
  const currentSymbol = currencySymbols[currency] || '$';

  if (!coins || coins.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={coins} margin={{ top: 20, right: isMobile ? 10 : 30, left: isMobile ? 0 : 20, bottom: 25 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
        <XAxis 
          dataKey="symbol" 
          tickFormatter={(v) => v.toUpperCase()}
          tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 12, fontWeight: 'bold' }} 
          axisLine={false}
          tickLine={false}
          dy={15}
        /> 
        <YAxis 
          stroke="#94a3b8"
          fontSize={10}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${currentSymbol}${v.toLocaleString()}`}
          width={isMobile ? 50 : 80}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
          formatter={(value) => [`${currentSymbol}${value.toLocaleString()}`, "Price"]}
        />
        <Line 
          type="monotone" 
          dataKey="current_price" 
          stroke="#22d3ee" 
          strokeWidth={4}
          dot={{ r: 4, fill: '#22d3ee', strokeWidth: 0 }}
          activeDot={{ r: 8, stroke: '#22d3ee', strokeWidth: 2, fill: '#0f172a' }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;