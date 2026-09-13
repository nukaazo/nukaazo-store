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
import Constants from 'expo-constants';

let GoogleSignin: any = null;
const isExpoGo = Constants.executionEnvironment === 'storeClient' || Constants.appOwnership === 'expo';

if (!isExpoGo) {
  try {
    GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
  } catch (e) {
    console.warn('GoogleSignin module could not be loaded:', e);
  }
}

export function useLoginHandler() {
  const router = useRouter();
  const { fetchProfile, updateProfileInCache } = useProfile();
  
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
  
  // State variables
  const [step, setStep] = useState<'email' | 'email_otp' | 'details' | 'phone_otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false);

  // Resend OTP Timer state and countdown effect
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if ((step === 'email_otp' || step === 'phone_otp') && resendTimer > 0) {
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

  // API Verification IDs
  const [emailVerificationId, setEmailVerificationId] = useState<string | null>(null);
  const [phoneVerificationId, setPhoneVerificationId] = useState<string | null>(null);

  // Save/Confirm states
  const [isNameSaved, setIsNameSaved] = useState(false);

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email.trim());
  const showError = touched && email.length > 0 && !isValidEmail;

  // Reanimated scales for tactile button responses
  const emailButtonScale = useSharedValue(1);
  const googleButtonScale = useSharedValue(1);
  const backButtonScale = useSharedValue(1);
  const otpButtonScale = useSharedValue(1);
  const detailsButtonScale = useSharedValue(1);

  const emailBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emailButtonScale.value }],
  }));

  const googleBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: googleButtonScale.value }],
  }));

  const backBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backButtonScale.value }],
  }));

  const otpBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: otpButtonScale.value }],
  }));

  const detailsBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: detailsButtonScale.value }],
  }));

  // Handlers for tactile feedback
  const handlePressIn = (scaleSharedValue: SharedValue<number>) => {
    scaleSharedValue.value = withTiming(0.96, { duration: 120 });
  };

  const handlePressOut = (scaleSharedValue: SharedValue<number>) => {
    scaleSharedValue.value = withTiming(1.0, { duration: 120 });
  };

  // Action handlers
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

  const handleOtpSubmit = async () => {
    if (otp.length !== 6 || !emailVerificationId) return;
    
    setIsLoading(true);
    try {
      const response = await authService.verifyViaOtp(otp, emailVerificationId);
      tokenStorage.set(response.token);

      const user = response.user;
      if (user && user.name && user.phone) {
        await fetchProfile(true);
        router.replace(ROUTES.DASHBOARD);
      } else {
        try {
          const { profile } = await fetchProfile(true);
          if (profile && profile.name && profile.phone) {
            router.replace(ROUTES.DASHBOARD);
          } else {
            if (profile?.name) {
              setFullName(profile.name);
              setIsNameSaved(true);
            }
            if (profile?.phone) setPhone(profile.phone);
            setStep('details');
          }
        } catch {
          setStep('details');
        }
      }
    } catch (err: any) {
      triggerModal("Verification Failed", err.message || "Invalid OTP code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleDetailsSubmit = async () => {
    if (fullName.length < 3 || phone.length < 10) return;
    
    setIsLoading(true);
    try {
      if (!isNameSaved) {
        await profileService.updateNonUniqueProfile({ name: fullName.trim() });
        setIsNameSaved(true);
      }
      
      const response = await profileService.generateOtp("PHONE", phone.trim());
      setPhoneVerificationId(response.verificationId || (response as any).verification_id);
      setPhoneOtp('');
      setResendTimer(30);
      setStep('phone_otp');
    } catch (err: any) {
      triggerModal("Update Failed", err.message || "Failed to save details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneOtpSubmit = async () => {
    if (phoneOtp.length !== 6 || !phoneVerificationId) return;
    
    setIsLoading(true);
    try {
      await profileService.verifyUniqueProfile(phoneVerificationId, phoneOtp);
      await fetchProfile(true);
      router.replace(ROUTES.DASHBOARD);
    } catch (err: any) {
      triggerModal("Verification Failed", err.message || "Invalid OTP code. Please try again.");
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

      const user = result.user;
      if (user && user.name && user.phone) {
        await fetchProfile(true);
        router.replace(ROUTES.DASHBOARD);
      } else {
        try {
          const { profile } = await fetchProfile(true);
          if (profile && profile.name && profile.phone) {
            router.replace(ROUTES.DASHBOARD);
          } else {
            if (profile?.name) {
              setFullName(profile.name);
              setIsNameSaved(true);
            }
            if (profile?.phone) setPhone(profile.phone);
            setStep('details');
          }
        } catch {
          setStep('details');
        }
      }
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

  const handleBack = () => {
    if (step === 'phone_otp') {
      setPhoneOtp('');
      setStep('details');
      return;
    }
    if (step === 'details') {
      tokenStorage.remove();
      setOtp('');
      setPhoneOtp('');
      setStep('email');
      return;
    }
    if (step === 'email_otp') {
      tokenStorage.remove();
      setOtp('');
      setStep('email');
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

  const handleResendOtp = async () => {
    if (resendTimer > 0 || isLoading) return;

    setIsLoading(true);
    try {
      if (step === 'email_otp') {
        const response = await authService.loginViaOtp("EMAIL", email.trim());
        setEmailVerificationId(response.verification_id || (response as any).verificationId);
        setOtp('');
        setResendTimer(30);
        triggerModal("OTP Resent", "A new verification code has been sent to your email.", "success");
      } else if (step === 'phone_otp') {
        const response = await profileService.generateOtp("PHONE", phone.trim());
        setPhoneVerificationId(response.verificationId || (response as any).verification_id);
        setPhoneOtp('');
        setResendTimer(30);
        triggerModal("OTP Resent", "A new verification code has been sent to your phone number.", "success");
      }
    } catch (err: any) {
      triggerModal("Resend Failed", err.message || "Failed to resend verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    setStep,
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
    backButtonScale,
    otpButtonScale,
    detailsButtonScale,
    emailBtnAnimatedStyle,
    googleBtnAnimatedStyle,
    backBtnAnimatedStyle,
    otpBtnAnimatedStyle,
    detailsBtnAnimatedStyle,
    handlePressIn,
    handlePressOut,
    handleEmailSubmit,
    handleOtpSubmit,
    handleDetailsSubmit,
    handlePhoneOtpSubmit,
    handleGoogleSignIn,
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
    handleResendOtp,
  };
}

export default useLoginHandler;
