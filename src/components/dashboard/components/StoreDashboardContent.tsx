import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import NukaazoLogo from '@/components/core/NukaazoLogo';
import { dashboardContent } from '../content/dashboard.content';
import { useDashboardHandler } from '../handlers/useDashboardHandler';
import { styles } from '../styles/dashboard.styles';

export default function StoreDashboardContent() {
  const {
    profile,
    shopUrl,
    isLoading,
    isSmall,
    isRefreshing,
    handleRefresh,
    handleLogout,
  } = useDashboardHandler();

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
          onPress={handleLogout}
          accessibilityLabel="Log out"
        >
          <Ionicons name="log-out-outline" size={20} color={colors.primary} />
          <Text style={styles.logoutText}>{dashboardContent.logoutText}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.avatarRing}>
          <Ionicons name="storefront" size={36} color={colors.primary} />
        </View>

        <Text style={[styles.welcomeTitle, isSmall && { fontSize: 20 }]}>
          {dashboardContent.title}
        </Text>
        <Text style={styles.subtitle}>
          {dashboardContent.welcomePrefix}
          {profile?.name || dashboardContent.defaultPartnerName}!
        </Text>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Ionicons name="link-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>{dashboardContent.labels.shop}</Text>
          <Text style={[styles.detailValue, { color: colors.primary }]}>
            {shopUrl || dashboardContent.fallbacks.shopActive}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>{dashboardContent.labels.name}</Text>
          <Text style={styles.detailValue}>
            {profile?.name || dashboardContent.fallbacks.emptyValue}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>{dashboardContent.labels.email}</Text>
          <Text style={styles.detailValue}>
            {profile?.email || dashboardContent.fallbacks.emptyValue}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="phone-portrait-outline" size={18} color={colors.textMutedDark} />
          <Text style={styles.detailLabel}>{dashboardContent.labels.phone}</Text>
          <Text style={styles.detailValue}>
            {profile?.phone || dashboardContent.fallbacks.emptyValue}
          </Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="checkmark-circle-outline" size={20} color={colors.secondary} />
        <Text style={styles.infoText}>{dashboardContent.infoMessage}</Text>
      </View>
    </ScrollView>
  );
}

