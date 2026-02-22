import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto(); // Get currency from Context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        setLoading(true);
        // We use the currency variable in the URL
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1`);
        
        if (!res.ok) throw new Error("The Market is closed (API Rate Limit reached)");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Adding a slight delay to ensure the "Loading State" requirement is visible
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchMarket();
  }, [setCoins, currency]); // Fetch again if currency changes

  return { loading, error };
};