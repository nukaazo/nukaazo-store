import React from 'react';
import {
  Animated,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { useNrViewHandler } from '../handlers/useNrViewHandler';
import ContactSupportModal from './ContactSupportModal';
import { emptyStoreProfileContent } from '../content/emptyStoreProfile.content';
import { styles } from '../styles/nrview.styles';
import CreateShopScreen from '@/components/shop/components/CreateShopScreen';

const SHOPKEEPER_3D_IMAGE = require('../../../../assets/images/indian_shopkeeper_3d.png');

export default function NRViewHome() {
  const {
    isRefreshing,
    isContactModalVisible,
    isCreatingShop,
    setIsCreatingShop,
    stagePulseAnim,
    annotationAnim,
    handleCreateStore,
    handleContactSupport,
    handleCloseContactModal,
    handleSignOut,
    handleRefresh,
    handleWhatsApp,
    handleCall,
    handleEmail,
  } = useNrViewHandler();

  if (isCreatingShop) {
    return <CreateShopScreen onBack={() => setIsCreatingShop(false)} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* ─── Top Section: Hero Illustration ─── */}
        <View style={styles.topSection}>
          <View style={styles.heroSection}>
            {/* Subtle Ambient Breathing Stage Rings */}
            <Animated.View
              style={[
                styles.stageRingPulse,
                { transform: [{ scale: stagePulseAnim }] },
              ]}
            />
            <View style={styles.stageRing} />

            {/* 3D Cutout */}
            <View style={styles.imageWrapper}>
              <Image
                source={SHOPKEEPER_3D_IMAGE}
                style={styles.shopkeeperImage}
                contentFit="contain"
                transition={150}
                priority="high"
              />

              {/* ─── Handwritten Annotations Beside Phone ─── */}
              <Animated.View
                style={[
                  styles.handwrittenContainer,
                  { transform: [{ translateY: annotationAnim }] },
                ]}
              >
                {/* Curved Connector Arrow from Phone Edge */}
                <Svg width="32" height="22" viewBox="0 0 26 22" style={styles.phoneConnectingArrow}>
                  <Path
                    d="M 3 18 Q 11 5, 22 7 M 17 3 L 23 7 L 18 12"
                    stroke="#0d9488"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>

                {/* Line 1: New order! */}
                <View style={[styles.handwrittenLineRow, { marginTop: 2, marginLeft: 8 }]}>
                  <Text style={styles.handwrittenText}>
                    {emptyStoreProfileContent.handwrittenAnnotations.line1}
                  </Text>
                </View>

                {/* Line 2: Today sales 7K */}
                <View style={[styles.handwrittenLineRow, { marginTop: 2, marginLeft: 8 }]}>
                  <Text style={styles.handwrittenSubText}>
                    {emptyStoreProfileContent.handwrittenAnnotations.line2}
                  </Text>
                </View>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* ─── Middle Section: Balanced Typography & Statement ─── */}
        <View style={styles.contentSection}>
          <Text style={styles.welcomeTitle}>
            {emptyStoreProfileContent.welcomeTitlePrefix}
            <Text style={{ color: colors.primary }}>{emptyStoreProfileContent.brandPrimary}</Text>
            <Text style={{ color: colors.secondary }}>{emptyStoreProfileContent.brandSecondary}</Text>
          </Text>
          <Text style={styles.statementText}>{emptyStoreProfileContent.statementText}</Text>
          <Text style={styles.descriptionText}>{emptyStoreProfileContent.descriptionText}</Text>
        </View>

        {/* ─── Bottom Action Block ─── */}
        <View style={styles.actionSection}>
          {/* Primary Action Button: Create Your Store */}
          <Pressable
            onPress={handleCreateStore}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
            accessibilityRole="button"
            accessibilityLabel={emptyStoreProfileContent.createStoreButtonText}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryHighlight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Ionicons name="storefront-outline" size={19} color="#ffffff" />
              <Text style={styles.primaryButtonText}>
                {emptyStoreProfileContent.createStoreButtonText}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" style={styles.arrowIcon} />
            </LinearGradient>
          </Pressable>

          {/* Aligned Secondary Row: Contact Support & Sign Out */}
          <View style={styles.secondaryRow}>
            <Pressable
              onPress={handleContactSupport}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel={emptyStoreProfileContent.contactSupportText}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={15} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>
                {emptyStoreProfileContent.contactSupportText}
              </Text>
            </Pressable>

            <View style={styles.secondaryDivider} />

            <Pressable
              onPress={handleSignOut}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel={emptyStoreProfileContent.signOutText}
            >
              <Ionicons name="log-out-outline" size={15} color={colors.textMutedDark} />
              <Text style={[styles.secondaryButtonText, { color: colors.textMutedDark }]}>
                {emptyStoreProfileContent.signOutText}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* ─── Support Channels Modal Sheet Component ─── */}
      <ContactSupportModal
        visible={isContactModalVisible}
        onClose={handleCloseContactModal}
        onWhatsApp={handleWhatsApp}
        onCall={handleCall}
        onEmail={handleEmail}
      />
    </SafeAreaView>
  );
}
