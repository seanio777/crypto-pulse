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
            className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
              currency === curr.code 
              ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
              : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-5">
              <span className={`text-3xl font-bold w-10 ${currency === curr.code ? 'text-cyan-400' : 'text-slate-400'}`}>
                {curr.symbol}
              </span>
              <div className="text-left">
                <p className="text-lg font-black tracking-tight">{curr.code}</p>
                <p className={`text-sm font-medium ${currency === curr.code ? 'text-cyan-200/70' : 'text-slate-500'}`}>
                  {curr.name}
                </p>
              </div>
            </div>
            {currency === curr.code && <CheckCircle2 className="text-cyan-400" size={28} strokeWidth={3} />}
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