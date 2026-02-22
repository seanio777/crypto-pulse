import MarketChart from '../components/MarketChart';
import { useCrypto } from '../context/CryptoContext';
import { BarChart3 } from 'lucide-react';

const Analysis = () => {
  const { currency } = useCrypto();

  return (
    /* Added overflow-x-hidden and w-full as a safety net */
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 md:pt-12 pb-8 text-white overflow-x-hidden">
      
      {/* Header Section: Adjusted gap and padding for mobile */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-12 text-center sm:text-left">
        <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shrink-0">
          <BarChart3 className="text-cyan-400" size={28} />
        </div>
        <div>
          <h1 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[1.1] break-words max-w-full">
            Market <span className="text-cyan-400">Intelligence</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.1em] text-[10px] sm:text-sm mt-2">
            Detailed Price Analytics
          </p>
        </div>
      </div>

      {/* Main Chart Card: Reduced padding on mobile (p-4) vs desktop (p-10) */}
      <div className="bg-slate-800/40 p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-700/50 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-1.5 h-8 md:w-2 md:h-10 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0"></div>
            <div className="min-w-0">
              <h2 className="text-lg md:text-2xl font-black text-white tracking-tighter uppercase leading-tight">
                Global Price Comparison
              </h2>
              <p className="text-[10px] md:text-sm font-bold text-slate-500 tracking-widest uppercase opacity-80">
                Top Assets by Market Cap
              </p>
            </div>
          </div>

          <div className="flex items-center self-start md:self-auto gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{currency} Live View</span>
          </div>
        </div>
        
        {/* Chart: Responsive height so it doesn't look weird on small phones */}
        <div className="h-[350px] sm:h-[450px] md:h-[550px] w-full relative">
          <MarketChart />
        </div>
      </div>
      
      <p className="mt-6 text-center text-slate-600 text-[10px] sm:text-sm font-medium italic px-4">
        * Data is pulled directly from the global context to ensure parity with the Market section.
      </p>
    </div>
  );
};

export default Analysis;