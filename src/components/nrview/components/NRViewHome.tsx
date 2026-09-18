import { useProfile } from '@/context/ProfileContext';
import { useShop } from '@/context/ShopContext';
import { colors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Linking,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { emptyStoreProfileContent } from '../content/emptyStoreProfile.content';
import { styles } from '../styles/nrview.styles';

const SHOPKEEPER_3D_IMAGE = require('../../../../assets/images/indian_shopkeeper_3d.png');

export default function NRViewHome() {
  const { logout, profile } = useProfile();
  const { refreshShopData } = useShop();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  // ─── Looping App-Native Animations ───
  const stagePulseAnim = useRef(new Animated.Value(1)).current;
  const annotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Stage Breathing Glow Loop
    const stageAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(stagePulseAnim, {
          toValue: 1.05,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(stagePulseAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Handwritten Annotation Subtle Float
    const annotationAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(annotationAnim, {
          toValue: -3,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(annotationAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    stageAnimation.start();
    annotationAnimation.start();

    return () => {
      stageAnimation.stop();
      annotationAnimation.stop();
    };
  }, [stagePulseAnim, annotationAnim]);

  const handleCreateStore = () => {
    setIsContactModalVisible(true);
  };

  const handleContactSupport = () => {
    setIsContactModalVisible(true);
  };

  const handleSignOut = () => {
    logout(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshShopData();
    } catch (err) {
      console.error('Failed to refresh shop data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleWhatsApp = () => {
    setIsContactModalVisible(false);
    const text = encodeURIComponent(
      `Hello Nukaazo Partner Support, I am registered as a store partner with phone ${profile?.phone || ''}. Please help me set up and activate my store.`
    );
    Linking.openURL(`https://wa.me/${emptyStoreProfileContent.supportModal.whatsapp}?text=${text}`).catch(() => { });
  };

  const handleCall = () => {
    setIsContactModalVisible(false);
    Linking.openURL(`tel:${emptyStoreProfileContent.supportModal.phone.replace(/\\s/g, '')}`).catch(() => { });
  };

  const handleEmail = () => {
    setIsContactModalVisible(false);
    const subject = encodeURIComponent('Store Setup & Activation Request');
    const body = encodeURIComponent(
      `Hello Nukaazo Support Team,\n\nI have registered with phone number ${profile?.phone || ''}.\nPlease help me set up and activate my store.\n\nThank you!`
    );
    Linking.openURL(`mailto:${emptyStoreProfileContent.supportModal.email}?subject=${subject}&body=${body}`).catch(
      () => { }
    );
  };

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
        {/* ─── Top Section: Anchored Hero Stage & Larger 3D Shopkeeper ─── */}
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

            {/* Larger 3D Cutout */}
            <View style={styles.imageWrapper}>
              <Image
                source={SHOPKEEPER_3D_IMAGE}
                style={styles.shopkeeperImage}
                contentFit="contain"
                transition={150}
                priority="high"
              />

              {/* ─── Handwritten Annotations Positioned Cleanly Beside Phone ─── */}
              <Animated.View
                style={[
                  styles.handwrittenContainer,
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

                {/* Line 1: Checkmark + New order! + Arrow */}
                <View style={[styles.handwrittenLineRow, { marginTop: 2, marginLeft: 8 }]}>
                  {/*  <Svg width="15" height="15" viewBox="0 0 15 15" style={styles.handwrittenCheck}>
                    <Path
                      d="M 2.5 8 L 5.5 12 L 13 3"
                      stroke="#0d9488"
                      strokeWidth="2.3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg> */}
                  <Text style={styles.handwrittenText}>{emptyStoreProfileContent.handwrittenAnnotations.line1}</Text>
                  {/* <Svg width="20" height="10" viewBox="0 0 20 10">
                    <Path
                      d="M 2 5 Q 10 2.5, 17 5 M 13 2 L 18 5 L 13 8"
                      stroke="#0d9488"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg> */}
                </View>

                {/* Line 2: Today sales 7K + Arrow */}
                <View style={[styles.handwrittenLineRow, { marginTop: 2, marginLeft: 8 }]}>
                  <Text style={styles.handwrittenSubText}>{emptyStoreProfileContent.handwrittenAnnotations.line2}</Text>
                  {/* <Svg width="20" height="10" viewBox="0 0 20 10">
                    <Path
                      d="M 2 5 Q 10 2.5, 17 5 M 13 2 L 18 5 L 13 8"
                      stroke="#0d9488"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg> */}
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

        {/* ─── Bottom Section: Shadowless Button & Aligned Secondary Row ─── */}
        <View style={styles.actionSection}>
          {/* Primary Action Button: Create Your Store (Flat / Shadowless) */}
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
              <Text style={styles.primaryButtonText}>{emptyStoreProfileContent.createStoreButtonText}</Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" style={styles.arrowIcon} />
            </LinearGradient>
          </Pressable>

          {/* Perfectly Aligned Secondary Row: Contact Support & Sign Out */}
          <View style={styles.secondaryRow}>
            <Pressable
              onPress={handleContactSupport}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel={emptyStoreProfileContent.contactSupportText}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={15} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>{emptyStoreProfileContent.contactSupportText}</Text>
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

      {/* ─── Support Channels Modal Sheet ─── */}
      <Modal
        visible={isContactModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsContactModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={25} tint="dark" style={{ ...Platform.select({ ios: { flex: 1 }, default: {} }) }} />

          <View style={styles.modalSheet}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{emptyStoreProfileContent.supportModal.title}</Text>
                <Text style={styles.modalSubtitle}>{emptyStoreProfileContent.supportModal.subtitle}</Text>
              </View>
              <Pressable
                onPress={() => setIsContactModalVisible(false)}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={20} color={colors.textStrong} />
              </Pressable>
            </View>

            {/* Option 1: WhatsApp Support */}
            <Pressable
              onPress={handleWhatsApp}
              style={({ pressed }) => [styles.contactOptionRow, pressed && styles.contactOptionPressed]}
            >
              <View style={[styles.contactIconBox, { backgroundColor: '#dcfce7' }]}>
                <Ionicons name="logo-whatsapp" size={22} color="#16a34a" />
              </View>
              <View style={styles.contactOptionContent}>
                <Text style={styles.contactOptionTitle}>WhatsApp Chat</Text>
                <Text style={styles.contactOptionSubtitle}>Instant onboarding help • Quick response</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMutedDark} />
            </Pressable>

            {/* Option 2: Call Merchant Desk */}
            <Pressable
              onPress={handleCall}
              style={({ pressed }) => [styles.contactOptionRow, pressed && styles.contactOptionPressed]}
            >
              <View style={[styles.contactIconBox, { backgroundColor: colors.orangeTint }]}>
                <Ionicons name="call" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactOptionContent}>
                <Text style={styles.contactOptionTitle}>Direct Phone Call</Text>
                <Text style={styles.contactOptionSubtitle}>{emptyStoreProfileContent.supportModal.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMutedDark} />
            </Pressable>

            {/* Option 3: Email Support */}
            <Pressable
              onPress={handleEmail}
              style={({ pressed }) => [styles.contactOptionRow, pressed && styles.contactOptionPressed]}
            >
              <View style={[styles.contactIconBox, { backgroundColor: colors.tealTint }]}>
                <Ionicons name="mail" size={20} color={colors.secondary} />
              </View>
              <View style={styles.contactOptionContent}>
                <Text style={styles.contactOptionTitle}>Email Support</Text>
                <Text style={styles.contactOptionSubtitle}>{emptyStoreProfileContent.supportModal.email}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMutedDark} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
