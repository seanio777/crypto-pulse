import MarketChart from '../components/MarketChart';
import { useCrypto } from '../context/CryptoContext';
import { BarChart3, TrendingUp } from 'lucide-react';

const Analysis = () => {
  const { currency, chartType, setChartType } = useCrypto(); // Get setters

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 md:pt-12 pb-8 text-white overflow-x-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 md:mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shrink-0">
            <BarChart3 className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[1.1]">
              Market <span className="text-cyan-400">Intelligence</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.1em] text-[10px] sm:text-sm">Detailed Price Analytics</p>
          </div>
        </div>

        {/* NEW: Chart Type Toggle Buttons */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700">
          <button 
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${chartType === 'line' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Line
          </button>
          <button 
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${chartType === 'bar' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Bar
          </button>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-slate-800/40 p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-700/50 shadow-2xl backdrop-blur-md">
        {/* ... (rest of your existing card content) ... */}
        <div className="h-[350px] sm:h-[450px] md:h-[550px] w-full relative">
          <MarketChart />
        </div>
      </div>
    </div>
  );
};

export default Analysis;