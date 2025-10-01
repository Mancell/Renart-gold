import { useState, useEffect } from 'react';

const GOLD_PRICE_OVERRIDE = 65.50; // USD per gram fallback

export const useGoldPrice = () => {
  const [goldPrice, setGoldPrice] = useState<number>(GOLD_PRICE_OVERRIDE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        // Try to fetch from a free gold price API
        const response = await fetch('https://api.metals.live/v1/spot/gold');
        if (response.ok) {
          const data = await response.json();
          // Convert troy ounce to gram (1 troy oz = 31.1035 grams)
          const pricePerGram = data[0] / 31.1035;
          setGoldPrice(pricePerGram);
        } else {
          setGoldPrice(GOLD_PRICE_OVERRIDE);
        }
      } catch (err) {
        setGoldPrice(GOLD_PRICE_OVERRIDE);
        setError('Using fallback gold price');
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();
  }, []);

  return { goldPrice, loading, error };
};
