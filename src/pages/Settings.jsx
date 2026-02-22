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

      <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
        <h2 className="text-lg font-medium text-slate-300 mb-6">Preferred Currency</h2>
        
        <div className="grid gap-4">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                currency === curr.code 
                ? 'bg-cyan-500/10 border-cyan-500 text-white' 
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-mono w-8">{curr.symbol}</span>
                <div className="text-left">
                  <p className="font-bold">{curr.code}</p>
                  <p className="text-xs opacity-60">{curr.name}</p>
                </div>
              </div>
              {currency === curr.code && <CheckCircle2 className="text-cyan-400" size={24} />}
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