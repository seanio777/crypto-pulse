import { useState, useEffect, useCallback } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We wrap this in useCallback so it doesn't change on every render
  const fetchMarket = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1`
      );
      
      if (!res.ok) throw new Error("API Rate Limit reached. Please wait.");
      
      const data = await res.json();
      setCoins(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      // REQUIREMENT: timer
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, [currency, setCoins]); // Only changes if currency or setCoins changes

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]); 

  return { loading, error };
};