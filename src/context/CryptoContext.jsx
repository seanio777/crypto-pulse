import { createContext, useState, useContext, useEffect } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

  // 1. INITIALIZATION: Instead of 'USD', check the browser's "memory" (localStorage)
  // If no currency is saved, it defaults to 'USD'
  const [currency, setCurrency] = useState(
    localStorage.getItem('userCurrency') || 'USD'
  );

  // 2. PERSISTENCE LOGIC: Every time the 'currency' state changes,
  // we save that new value into localStorage automatically.
  useEffect(() => {
    localStorage.setItem('userCurrency', currency);
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);