import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useShop } from '@/context/ShopContext';
import { colors } from '@/theme/colors';
import NRViewHome from '@/components/nrview/components/NRViewHome';
import StoreDashboardContent from './StoreDashboardContent';
import { styles } from '../styles/dashboard.styles';

export default function StoreDashboard() {
  const { shopUrl, isLoading } = useShop();

  // Show loading spinner when checking shop status
  if (isLoading && !shopUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // If user has no shop registered yet, render NRView onboarding flow
  if (!shopUrl) {
    return <NRViewHome />;
  }

  // User has a registered shop -> render Store Dashboard
  return <StoreDashboardContent />;
}
