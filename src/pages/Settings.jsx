import { useCrypto } from '../context/CryptoContext';
import { Globe, CheckCircle2 } from 'lucide-react';

const Settings = () => {
  const { currency, setCurrency } = useCrypto();

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Globe className="text-cyan-400" size={32} />
        <h1 className="text-3xl font-bold text-white">Market Settings</h1>
      </div>

      <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 p-8 shadow-2xl backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-8 border-b border-slate-700 pb-4">Preferred Currency</h2>
        
        <div className="grid gap-4">
        {currencies.map((curr) => (
            <button
                key={curr.code}
                onClick={() => setCurrency(curr.code)}
                className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-200 ${
                currency === curr.code 
                ? 'bg-white border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-[1.02]' 
                : 'bg-white/90 border-slate-700 hover:border-slate-500'
                }`}
            >
                <div className="flex items-center gap-5">
                {/* SYMBOL: Stays Cyan for visibility */}
                <span className="text-3xl font-black w-10 text-cyan-500">
                    {curr.symbol}
                </span>
                
                <div className="text-left">
                    {/* CURRENCY CODE: Always text-slate-900 (Deep Black/Blue) */}
                    <p className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                    {curr.code}
                    </p>
                    
                    {/* FULL NAME: Always text-slate-600 (Dark Gray) */}
                    <p className="text-sm font-bold text-slate-600">
                    {curr.name}
                    </p>
                </div>
                </div>

                {/* SELECTION INDICATOR */}
                <div className="flex items-center">
                {currency === curr.code ? (
                    <CheckCircle2 className="text-slate-900" size={32} strokeWidth={3} />
                ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-slate-300" />
                )}
                </div>
            </button>
        ))}
        </div>

        <p className="mt-8 text-sm text-slate-500 text-center italic">
          Changing the currency will automatically re-sync market data.
        </p>
      </div>
    </div>
  );
};

export default Settings;