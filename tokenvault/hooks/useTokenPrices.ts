"use client";

import { useState, useEffect } from "react";
import { getPrice } from "@/services/coingecko";

export const useTokenPrices = () => {
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      const price = await getPrice("ethereum");
      setEthPrice(price);
      setIsLoading(false);
    };

    fetchPrices();

    // Refresh price every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return { ethPrice, isLoading };
};
