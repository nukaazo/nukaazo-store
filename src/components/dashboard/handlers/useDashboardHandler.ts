import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useProfile } from '@/context/ProfileContext';
import { useShop } from '@/context/ShopContext';

export function useDashboardHandler() {
  const { profile, logout } = useProfile();
  const { shopUrl, refreshShopData, isLoading } = useShop();
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshShopData();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    logout(true);
  };

  return {
    profile,
    shopUrl,
    isLoading,
    isSmall,
    isRefreshing,
    handleRefresh,
    handleLogout,
  };
}
