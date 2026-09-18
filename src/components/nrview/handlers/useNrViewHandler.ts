import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Linking } from 'react-native';
import { useProfile } from '@/context/ProfileContext';
import { useShop } from '@/context/ShopContext';
import { emptyStoreProfileContent } from '../content/emptyStoreProfile.content';

export function useNrViewHandler() {
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

  const handleCloseContactModal = () => {
    setIsContactModalVisible(false);
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
    Linking.openURL(`https://wa.me/${emptyStoreProfileContent.supportModal.whatsapp}?text=${text}`).catch(() => {});
  };

  const handleCall = () => {
    setIsContactModalVisible(false);
    Linking.openURL(`tel:${emptyStoreProfileContent.supportModal.phone.replace(/\\s/g, '')}`).catch(() => {});
  };

  const handleEmail = () => {
    setIsContactModalVisible(false);
    const subject = encodeURIComponent('Store Setup & Activation Request');
    const body = encodeURIComponent(
      `Hello Nukaazo Support Team,\n\nI have registered with phone number ${profile?.phone || ''}.\nPlease help me set up and activate my store.\n\nThank you!`
    );
    Linking.openURL(`mailto:${emptyStoreProfileContent.supportModal.email}?subject=${subject}&body=${body}`).catch(
      () => {}
    );
  };

  return {
    isRefreshing,
    isContactModalVisible,
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
  };
}

export default useNrViewHandler;
