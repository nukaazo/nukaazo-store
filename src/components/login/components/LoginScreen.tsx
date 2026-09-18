import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

import CustomModal from '@/components/common/CustomModal/CustomModal';
import { colors } from '@/theme/colors';
import { loginContent } from '../content/login.content';
import { useLoginHandler } from '../handlers/useLoginHandler';
import { styles } from '../Login.styles';
import DetailsForm from './DetailsForm';
import EmailForm from './EmailForm';
import OtpForm from './OtpForm';
import DetailsSkeleton from './DetailsSkeleton';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    fullName,
    setFullName,
    phone,
    setPhone,
    phoneOtp,
    setPhoneOtp,
    isFocused,
    setIsFocused,
    touched,
    setTouched,
    isLoading,
    isGoogleLoading,
    isValidEmail,
    showError,
    emailButtonScale,
    googleButtonScale,
    otpButtonScale,
    detailsButtonScale,
    emailBtnAnimatedStyle,
    googleBtnAnimatedStyle,
    otpBtnAnimatedStyle,
    detailsBtnAnimatedStyle,
    handlePressIn,
    handlePressOut,
    handleEmailSubmit,
    handleOtpSubmit,
    handleDetailsSubmit,
    handlePhoneOtpSubmit,
    handleGoogleSignIn,
    handleTermsPress,
    modalVisible,
    modalTitle,
    modalMessage,
    modalType,
    setModalVisible,
    isNameSaved,
    handleSaveName,
    handleBack,
    handleRefreshProfile,
    isRefreshingProfile,
    resendTimer,
    handleResendOtp,
  } = useLoginHandler();

  // Dynamically calculate responsive hero spacer height
  const heroSpacerHeight = keyboardVisible
    ? 20
    : height < 680
    ? height * 0.28
    : height < 800
    ? height * 0.38
    : height * 0.44;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* ─── 100% Background Image ─── */}
      <Image
        source={require('../../../../assets/images/handover-hero.png')}
        style={styles.backgroundImage}
        contentFit="cover"
        contentPosition="top center"
        transition={0}
      />

      {/* ─── Top back button header ─── */}
      {step !== 'email' && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={22} color={colors.textStrong} />
          </TouchableOpacity>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : (keyboardVisible ? 'height' : undefined)}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Responsive Hero Spacer */}
          <View style={[styles.heroSpacer, { height: heroSpacerHeight }]} />

          {/* ─── Double-layered Torn Paper Separator ─── */}
          <View style={styles.tornPaperWrapper}>
            {/* Layer 1: Darker Paper Shadow Layer */}
            <Svg height="32" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={styles.tornShadow}>
              <Path
                d="M 0 8 L 2 9 L 4 6 L 6 8 L 8 11 L 9 7 L 10 21 L 13 22 L 15 11 L 16 7 L 18 9 L 20 3 L 22 4 L 24 10 L 26 8 L 28 9 L 30 9 L 32 14 L 34 19 L 36 17 L 38 14 L 40 15 L 42 12 L 44 15 L 46 13 L 48 7 L 50 8 L 52 6 L 54 9 L 56 12 L 58 10 L 60 11 L 62 9 L 64 11 L 66 8 L 68 4 L 70 5 L 72 12 L 74 10 L 76 13 L 78 21 L 80 18 L 82 18 L 84 14 L 86 17 L 88 9 L 90 8 L 92 7 L 94 11 L 96 9 L 98 7 L 100 5 L 100 30 L 0 30 Z"
                fill="rgba(185, 168, 145, 0.95)"
              />
            </Svg>

            {/* Layer 2: White Ripped Paper Fiber Layer */}
            <Svg height="32" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={styles.tornFiber}>
              <Path
                d="M 0 10 L 2 11 L 4 8 L 6 10 L 8 13 L 9 9 L 10 23 L 13 24 L 15 9 L 20 5 L 23 11 L 30 11 L 34 21 L 38 16 L 43 17 L 49 9 L 52 7 L 56 14 L 63 13 L 69 6 L 72 13 L 78 23 L 82 20 L 87 11 L 93 9 L 97 13 L 100 7 L 100 30 L 0 30 Z"
                fill="#ffffff"
              />
            </Svg>
            
            {/* Layer 3: Main Cream Paper Layer */}
            <Svg height="32" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={styles.tornMain}>
              <Path
                d="M 0 12 L 2 13 L 4 10 L 6 12 L 8 15 L 9 11 L 10 25 L 13 26 L 15 11 L 20 7 L 22 8 L 24 14 L 26 12 L 28 13 L 30 13 L 32 18 L 34 23 L 36 21 L 38 18 L 40 19 L 42 16 L 44 19 L 46 17 L 48 11 L 50 12 L 52 10 L 54 13 L 56 16 L 58 14 L 60 15 L 62 13 L 64 15 L 66 12 L 68 8 L 70 9 L 72 16 L 74 14 L 76 17 L 78 25 L 82 22 L 82 22 L 84 18 L 86 21 L 88 13 L 90 12 L 92 11 L 94 15 L 96 13 L 98 11 L 100 9 L 100 30 L 0 30 Z"
                fill={colors.background}
              />
            </Svg>

            {/* Hanging Torn Paper Strip */}
            <View style={{ position: 'absolute', left: '72%', top: 12, width: 20, height: 28, zIndex: 12 }}>
              <Svg height="28" width="20" viewBox="0 0 20 28" preserveAspectRatio="none" style={{ position: 'absolute', top: 2, left: 1 }}>
                <Path
                  d="M 3 0 C 5 8, 8 16, 12 25 C 9 26, 5 24, 1 22 C 2 14, 2 7, 3 0 Z"
                  fill="rgba(0, 0, 0, 0.12)"
                />
              </Svg>
              <Svg height="28" width="20" viewBox="0 0 20 28" preserveAspectRatio="none">
                <Path
                  d="M 3 0 C 5 8, 8 16, 12 25 C 9 26, 5 24, 1 22 C 2 14, 2 7, 3 0 Z"
                  fill={colors.background}
                />
              </Svg>
            </View>
          </View>

          {/* ─── Solid Cream Bottom Form Section ─── */}
          <View style={[styles.contentContainer, { paddingBottom: Math.max(12, 8 + insets.bottom) }]}>
            <View style={styles.bottomSectionContent}>
              
              {/* Welcome Title */}
              <View style={styles.welcomeContainer}>
                {step === 'details' ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={styles.title}>
                      {loginContent.detailsTitleStart} <Text style={{ color: colors.primary }}>{loginContent.detailsTitleHighlight}</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={handleRefreshProfile}
                      disabled={isLoading}
                      style={{ padding: 8, borderRadius: 20, backgroundColor: '#f4f4f5' }}
                      accessibilityLabel="Refresh profile details"
                    >
                      <Ionicons name="refresh" size={18} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.title}>
                    {loginContent.welcomeTitleStart} <Text style={{ color: colors.primary }}>{loginContent.welcomeTitleHighlight} :)</Text>
                  </Text>
                )}
                {step === 'details' && (
                  <Text style={{ fontFamily: 'Nunito_400Regular', color: colors.textBody, fontSize: 13.5, marginTop: 4 }}>
                    {loginContent.detailsSubtitle}
                  </Text>
                )}
              </View>

              {/* Dynamic Forms */}
              {step === 'email' && (
                <EmailForm
                  email={email}
                  setEmail={setEmail}
                  isFocused={isFocused}
                  setIsFocused={setIsFocused}
                  touched={touched}
                  setTouched={setTouched}
                  isLoading={isLoading}
                  isGoogleLoading={isGoogleLoading}
                  isValidEmail={isValidEmail}
                  showError={showError}
                  emailButtonScale={emailButtonScale}
                  googleButtonScale={googleButtonScale}
                  emailBtnAnimatedStyle={emailBtnAnimatedStyle}
                  googleBtnAnimatedStyle={googleBtnAnimatedStyle}
                  handlePressIn={handlePressIn}
                  handlePressOut={handlePressOut}
                  handleEmailSubmit={handleEmailSubmit}
                  handleGoogleSignIn={handleGoogleSignIn}
                  handleTermsPress={handleTermsPress}
                />
              )}

              {step === 'email_otp' && (
                <OtpForm
                  target={email}
                  otp={otp}
                  setOtp={setOtp}
                  isLoading={isLoading}
                  otpButtonScale={otpButtonScale}
                  otpBtnAnimatedStyle={otpBtnAnimatedStyle}
                  handlePressIn={handlePressIn}
                  handlePressOut={handlePressOut}
                  onSubmit={handleOtpSubmit}
                  resendTimer={resendTimer}
                  onResend={handleResendOtp}
                />
              )}

              {step === 'details' && (
                isRefreshingProfile ? (
                  <DetailsSkeleton />
                ) : (
                  <DetailsForm
                    email={email}
                    fullName={fullName}
                    setFullName={setFullName}
                    phone={phone}
                    setPhone={setPhone}
                    isLoading={isLoading}
                    detailsButtonScale={detailsButtonScale}
                    detailsBtnAnimatedStyle={detailsBtnAnimatedStyle}
                    handlePressIn={handlePressIn}
                    handlePressOut={handlePressOut}
                    handleDetailsSubmit={handleDetailsSubmit}
                    isNameSaved={isNameSaved}
                    handleSaveName={handleSaveName}
                  />
                )
              )}

              {step === 'phone_otp' && (
                <OtpForm
                  target={phone}
                  otp={phoneOtp}
                  setOtp={setPhoneOtp}
                  isLoading={isLoading}
                  otpButtonScale={otpButtonScale}
                  otpBtnAnimatedStyle={otpBtnAnimatedStyle}
                  handlePressIn={handlePressIn}
                  handlePressOut={handlePressOut}
                  onSubmit={handlePhoneOtpSubmit}
                  resendTimer={resendTimer}
                  onResend={handleResendOtp}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </View>
  );
}
