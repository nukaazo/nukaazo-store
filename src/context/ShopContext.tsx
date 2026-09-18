import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { shopService, ShopData } from "@/services/shop.service";
import { tokenStorage } from "@/utils/tokenStorage";

interface ShopContextType {
  shopId: string | null;
  shopUrl: string | null;
  shopData: ShopData | null;
  isLoading: boolean;
  error: string | null;
  refreshShopData: () => Promise<void>;
  clearShopCache: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShopData = useCallback(async () => {
    const token = tokenStorage.get();
    if (!token) {
      setShopData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await shopService.findShopUser();
      if (response && (response.shopId || response.shopUrl)) {
        setShopData({
          ...response,
          shopId: response.shopId || null,
          shopUrl: response.shopUrl || null,
        });
      } else {
        setShopData({ shopId: null, shopUrl: null });
      }
      setError(null);
    } catch (err: any) {
      setShopData({ shopId: null, shopUrl: null });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearShopCache = useCallback(() => {
    setShopData(null);
    setError(null);
  }, []);

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      fetchShopData();
    }
  }, [fetchShopData]);

  return (
    <ShopContext.Provider
      value={{
        shopId: shopData?.shopId || null,
        shopUrl: shopData?.shopUrl || null,
        shopData,
        isLoading,
        error,
        refreshShopData: fetchShopData,
        clearShopCache,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

export default ShopContext;
