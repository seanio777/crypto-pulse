import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins, currency, chartType } = useCrypto(); // Get chartType
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currencySymbols = { USD: '$', PHP: '₱', EUR: '€', JPY: '¥', GBP: '£' };
  const currentSymbol = currencySymbols[currency] || '$';

  if (!coins || coins.length === 0) return null;

  // Shared props for both chart types
  const commonProps = {
    data: coins,
    margin: { top: 20, right: isMobile ? 10 : 30, left: isMobile ? 0 : 20, bottom: 25 }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {chartType === 'bar' ? (
        <BarChart {...commonProps} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
          <XAxis dataKey="symbol" tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${currentSymbol}${v.toLocaleString()}`} width={isMobile ? 50 : 80} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
          <Bar dataKey="current_price" fill="#22d3ee" radius={[6, 6, 0, 0]} barSize={isMobile ? 30 : 65} />
        </BarChart>
      ) : (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
          <XAxis dataKey="symbol" tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${currentSymbol}${v.toLocaleString()}`} width={isMobile ? 50 : 80} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
          <Line type="monotone" dataKey="current_price" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} activeDot={{ r: 8 }} />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default MarketChart;