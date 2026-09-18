import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '@/context/ProfileContext';
import { useShop } from '@/context/ShopContext';
import { colors } from '@/theme/colors';
import NukaazoLogo from '@/components/core/NukaazoLogo';
import NRViewHome from '@/components/nrview/components/NRViewHome';

function StoreDashboardContent() {
  const { profile, logout } = useProfile();
  const { shopUrl, refreshShopData, isLoading } = useShop();
  const { width } = useWindowDimensions();
  const isSmall = width < 375;
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshShopData();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing || isLoading}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <NukaazoLogo width={40} height={40} fill="transparent" />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout(true)}
          accessibilityLabel="Log out"
        >
          <Ionicons name="log-out-outline" size={20} color={colors.primary} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.avatarRing}>
          <Ionicons name="storefront" size={36} color={colors.primary} />
        </View>

        <Text style={[styles.welcomeTitle, isSmall && { fontSize: 20 }]}>
          Store Dashboard
        </Text>
        <Text style={styles.subtitle}>
          Welcome, {profile?.name || 'Partner'}!
        </Text>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Ionicons name="link-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>Shop:</Text>
          <Text style={[styles.detailValue, { color: colors.primary }]}>
            {shopUrl || 'Active'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>{profile?.name || '—'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{profile?.email || '—'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="phone-portrait-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{profile?.phone || '—'}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="checkmark-circle-outline" size={20} color={colors.secondary} />
        <Text style={styles.infoText}>
          Your shop is active and connected. You can manage incoming orders, catalog, and store settings here.
        </Text>
      </View>
    </ScrollView>
  );
}

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.orangeTint,
    gap: 6,
  },
  logoutText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 13,
    color: colors.primary,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.orangeTint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(232, 92, 28, 0.2)',
  },
  welcomeTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 22,
    color: colors.textStrong,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14,
    color: colors.textBody,
    marginBottom: 16,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderDivider,
    width: '100%',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    gap: 8,
  },
  detailLabel: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 13,
    color: colors.textMutedDark,
    width: 60,
  },
  detailValue: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 13.5,
    color: colors.textStrong,
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tealTint,
    padding: 14,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 99, 99, 0.15)',
  },
  infoText: {
    flex: 1,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12.5,
    color: colors.secondary,
    lineHeight: 18,
  },
});
