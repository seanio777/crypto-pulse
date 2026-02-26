import { createContext, useState, useContext, useEffect } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState(localStorage.getItem('userCurrency') || 'USD');

  // NEW: chartType state (defaults to 'line' if nothing is saved)
  const [chartType, setChartType] = useState(localStorage.getItem('userChartType') || 'line');

  // Sync currency to localStorage
  useEffect(() => {
    localStorage.setItem('userCurrency', currency);
  }, [currency]);

  // NEW: Sync chartType to localStorage
  useEffect(() => {
    localStorage.setItem('userChartType', chartType);
  }, [chartType]);

  return (
    <CryptoContext.Provider value={{ 
      coins, setCoins, 
      currency, setCurrency, 
      chartType, setChartType // Export these
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);