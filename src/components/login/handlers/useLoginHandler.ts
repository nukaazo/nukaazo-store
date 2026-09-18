import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  SharedValue
} from 'react-native-reanimated';
import { authService } from '@/services/auth.service';
import { profileService } from '@/services/profile.service';
import { tokenStorage } from '@/utils/tokenStorage';
import { useProfile } from '@/context/ProfileContext';
import { ROUTES } from '@/helper/routes';
import { isValidPhone as checkValidPhone } from '@/utils/validations';
// import Constants from 'expo-constants';

/*
// =========================================================================
// Google OAuth Configuration commented out for now
// =========================================================================
let GoogleSignin: any = null;
const isExpoGo = Constants.executionEnvironment === 'storeClient' || Constants.appOwnership === 'expo';

if (!isExpoGo) {
  try {
    GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
  } catch (e) {
    console.warn('GoogleSignin module could not be loaded:', e);
  }
}
*/

export type LoginStep = 'phone' | 'otp' | 'details' | 'email' | 'email_otp' | 'phone_otp';

export function useLoginHandler() {
  const router = useRouter();
  const { fetchProfile, updateProfileInCache } = useProfile();
  
  /*
  // Configure Google Sign-In (Commented out)
  useEffect(() => {
    if (GoogleSignin) {
      try {
        GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '192594242477-gbhgj2ne7njdqhk634k421rphrmeugqv.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          offlineAccess: false,
        });
      } catch (err) {
        console.warn('Failed to configure Google Sign-In:', err);
      }
    }
  }, []);
  */
  
  // State variables - Phone-only authentication as default
  const [step, setStep] = useState<LoginStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneVerificationId, setPhoneVerificationId] = useState<string | null>(null);

  // Additional details state (preserved for future profile updates)
  const [fullName, setFullName] = useState('');
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false);

  /*
  // Email-based states (Commented out for now)
  const [email, setEmail] = useState('');
  const [emailVerificationId, setEmailVerificationId] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email.trim());
  */

  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Resend OTP Timer state and countdown effect
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (step === 'otp' && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, step]);

  // CustomModal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'error' | 'success' | 'info'>('error');

  const triggerModal = (title: string, message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  // Phone validation
  const isValidPhone = checkValidPhone(phone.trim());
  const showError = touched && phone.length > 0 && !isValidPhone;

  // Reanimated scales for tactile button responses
  const phoneButtonScale = useSharedValue(1);
  const otpButtonScale = useSharedValue(1);
  const backButtonScale = useSharedValue(1);
  const detailsButtonScale = useSharedValue(1);

  /*
  // Scale shared values for commented out buttons
  const emailButtonScale = useSharedValue(1);
  const googleButtonScale = useSharedValue(1);
  */

  const phoneBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: phoneButtonScale.value }],
  }));

  const otpBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: otpButtonScale.value }],
  }));

  const backBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backButtonScale.value }],
  }));

  const detailsBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: detailsButtonScale.value }],
  }));

  /*
  const emailBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emailButtonScale.value }],
  }));

  const googleBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: googleButtonScale.value }],
  }));
  */

  // Handlers for tactile feedback
  const handlePressIn = (scaleSharedValue: SharedValue<number>) => {
    scaleSharedValue.value = withTiming(0.96, { duration: 120 });
  };

  const handlePressOut = (scaleSharedValue: SharedValue<number>) => {
    scaleSharedValue.value = withTiming(1.0, { duration: 120 });
  };

  // =========================================================================
  // Phone OTP Flow Handlers (aligned with nukaazo-proto)
  // =========================================================================
  
  /**
   * Generates and sends OTP to the specified phone number.
   * Calls POST /api/v1/auth/generate-otp with { type: "PHONE", value: phone }
   */
  const handlePhoneSubmit = async () => {
    const trimmedPhone = phone.trim();
    if (!checkValidPhone(trimmedPhone)) {
      setTouched(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await authService.loginViaOtp("PHONE", trimmedPhone);
      setPhoneVerificationId(response.verification_id || (response as any).verificationId);
      setOtp('');
      setResendTimer(30);
      setStep('otp');
    } catch (err: any) {
      triggerModal("Login Failed", err.message || "Failed to generate OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verifies the OTP with backend and signs the user in.
   * Calls POST /api/v1/auth/signin with { otp, verificationId }
   */
  const handleOtpSubmit = async () => {
    if (otp.length !== 6 || !phoneVerificationId) return;
    
    setIsLoading(true);
    try {
      const response = await authService.verifyViaOtp(otp, phoneVerificationId);
      tokenStorage.set(response.token);

      // Refresh profile data in context
      await fetchProfile(true);
      router.replace(ROUTES.DASHBOARD);
    } catch (err: any) {
      triggerModal("Verification Failed", err.message || "Invalid OTP code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resends OTP to the current phone number.
   */
  const handleResendOtp = async () => {
    if (resendTimer > 0 || isLoading) return;

    setIsLoading(true);
    try {
      const response = await authService.loginViaOtp("PHONE", phone.trim());
      setPhoneVerificationId(response.verification_id || (response as any).verificationId);
      setOtp('');
      setResendTimer(30);
      triggerModal("OTP Resent", "A new verification code has been sent to your phone number.", "success");
    } catch (err: any) {
      triggerModal("Resend Failed", err.message || "Failed to resend verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'otp') {
      setOtp('');
      setStep('phone');
      return;
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(ROUTES.ROOT);
    }
  };

  const handleTermsPress = (docName: string) => {
    if (docName === 'Terms of Service') {
      router.push(ROUTES.TERMS);
    } else if (docName === 'Privacy Policy') {
      router.push(ROUTES.PRIVACY);
    } else {
      triggerModal(docName, `Displaying ${docName} standard content...`, 'info');
    }
  };

  /*
  // =========================================================================
  // Email and Google Sign-In logic commented out for now
  // =========================================================================
  
  const handleEmailSubmit = async () => {
    if (!isValidEmail) {
      setTouched(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await authService.loginViaOtp("EMAIL", email.trim());
      setEmailVerificationId(response.verification_id || (response as any).verificationId);
      setOtp('');
      setResendTimer(30);
      setStep('email_otp');
    } catch (err: any) {
      triggerModal("Login Failed", err.message || "Failed to generate OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!GoogleSignin) {
      triggerModal(
        "Feature Unavailable",
        "Google Sign-In is not supported in Expo Go. Please run the app using a development build (npm run android or npm run ios).",
        "info"
      );
      return;
    }

    setIsGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = (response as any).data?.idToken || (response as any).idToken;

      if (!idToken) {
        throw new Error("No ID token returned from Google Sign-In");
      }

      const result = await authService.loginViaGoogle(idToken);
      tokenStorage.set(result.token);
      await fetchProfile(true);
      router.replace(ROUTES.DASHBOARD);
    } catch (err: any) {
      const isCancelled =
        err.code === '12501' ||
        err.code === 'SIGN_IN_CANCELLED' ||
        err.message?.includes('cancelled') ||
        err.message?.includes('Cancel');

      if (!isCancelled) {
        triggerModal(
          "Google Sign-In Failed",
          err.message || "Failed to authenticate with Google. Please try again."
        );
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };
  */

  const handleSaveName = async () => {
    if (fullName.trim().length < 3) return;
    
    setIsLoading(true);
    try {
      await profileService.updateNonUniqueProfile({ name: fullName.trim() });
      updateProfileInCache({ name: fullName.trim() });
      setIsNameSaved(true);
      triggerModal("Name Saved", "Your name has been updated successfully.", "success");
    } catch (err: any) {
      triggerModal("Save Failed", err.message || "Failed to save your name. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshProfile = async () => {
    setIsRefreshingProfile(true);
    setIsLoading(true);
    try {
      const { profile } = await fetchProfile(true);
      if (profile) {
        if (profile.name) {
          setFullName(profile.name);
          setIsNameSaved(true);
        }
        if (profile.phone) {
          setPhone(profile.phone);
        }
      }
    } catch (err: any) {
      triggerModal("Refresh Failed", err.message || "Failed to refresh profile. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshingProfile(false);
    }
  };

  return {
    step,
    setStep,
    phone,
    setPhone,
    otp,
    setOtp,
    phoneVerificationId,
    fullName,
    setFullName,
    isFocused,
    setIsFocused,
    touched,
    setTouched,
    isLoading,
    isValidPhone,
    showError,
    phoneButtonScale,
    otpButtonScale,
    backButtonScale,
    detailsButtonScale,
    phoneBtnAnimatedStyle,
    otpBtnAnimatedStyle,
    backBtnAnimatedStyle,
    detailsBtnAnimatedStyle,
    handlePressIn,
    handlePressOut,
    handlePhoneSubmit,
    handleOtpSubmit,
    handleResendOtp,
    handleBack,
    handleTermsPress,
    handleRefreshProfile,
    isRefreshingProfile,
    modalVisible,
    modalTitle,
    modalMessage,
    modalType,
    setModalVisible,
    isNameSaved,
    handleSaveName,
    resendTimer,
    // Commented out email/google exports preserved for reference
    /*
    email,
    setEmail,
    isValidEmail,
    isGoogleLoading,
    emailButtonScale,
    googleButtonScale,
    emailBtnAnimatedStyle,
    googleBtnAnimatedStyle,
    handleEmailSubmit,
    handleGoogleSignIn,
    */
  };
}

export default useLoginHandler;
