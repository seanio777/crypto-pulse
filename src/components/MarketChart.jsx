import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins, currency } = useCrypto();
  // State to track if screen is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update state on resize
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
      <BarChart 
        data={coins} 
        /* Reduced horizontal margins for mobile to give the chart more room */
        margin={{ 
          top: 20, 
          right: isMobile ? 10 : 30, 
          left: isMobile ? 0 : 20, 
          bottom: 25 
        }}
        barGap={8}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
        
        <XAxis 
          dataKey="symbol" 
          tickFormatter={(value) => value.toUpperCase()}
          tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 12, fontWeight: 'bold' }} 
          tickLine={false}
          axisLine={false}
          dy={15}
          /* On very small screens, hide some labels if they overlap */
          interval={isMobile ? "preserveStartEnd" : 0} 
        /> 
        
        <YAxis 
          orientation="left"
          stroke="#94a3b8"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${currentSymbol}${value.toLocaleString()}`}
          /* Narrower width on mobile so the bars have more space */
          width={isMobile ? 50 : 80}
        />

        <Tooltip 
          cursor={{ fill: 'rgba(34, 211, 238, 0.1)' }}
          contentStyle={{ 
            backgroundColor: '#1e293b', 
            border: '1px solid #334155', 
            borderRadius: '12px',
            color: '#fff',
            fontSize: '12px'
          }}
          labelFormatter={(label) => label.toUpperCase()}
          formatter={(value) => [`${currentSymbol}${value.toLocaleString()}`, "Price"]}
        />

        <Bar 
          dataKey="current_price" 
          fill="#22d3ee" 
          radius={[6, 6, 0, 0]} 
          /* DYNAMIC: Thinner bars on mobile so they don't overlap */
          barSize={isMobile ? 30 : 65} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;