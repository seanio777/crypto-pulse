import MarketChart from '../components/MarketChart';
import { useCrypto } from '../context/CryptoContext';
import { BarChart3 } from 'lucide-react';

const Analysis = () => {
  const { currency } = useCrypto();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-12 pb-8 text-white">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
          <BarChart3 className="text-cyan-400" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Market Intelligence</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">Detailed Price Analytics</p>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="bg-slate-800/40 p-10 pb-4 rounded-[2.5rem] border border-slate-700/50 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                Global Price Comparison
              </h2>
              <p className="text-sm font-bold text-slate-500 tracking-widest uppercase opacity-80">
                Top Assets by Market Cap
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
              {currency} Live View
            </span>
          </div>
        </div>
        
        <div className="h-[550px] w-full">
          <MarketChart />
        </div>
      </div>
      
      <p className="mt-4 text-center text-slate-600 text-sm font-medium italic">
        * Data is pulled directly from the global context to ensure parity with the Market section.
      </p>
    </div>
  );
};

export default Analysis;