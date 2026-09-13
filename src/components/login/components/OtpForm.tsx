import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

import { colors } from '@/theme/colors';
import { loginContent } from '../content/login.content';
import { styles } from '../Login.styles';

interface OtpFormProps {
  target: string;
  otp: string;
  setOtp: (val: string) => void;
  isLoading: boolean;
  otpButtonScale: SharedValue<number>;
  otpBtnAnimatedStyle: any;
  handlePressIn: (scale: SharedValue<number>) => void;
  handlePressOut: (scale: SharedValue<number>) => void;
  onSubmit: () => void;
  resendTimer: number;
  onResend: () => void;
}

export default function OtpForm({
  target,
  otp,
  setOtp,
  isLoading,
  otpButtonScale,
  otpBtnAnimatedStyle,
  handlePressIn,
  handlePressOut,
  onSubmit,
  resendTimer,
  onResend,
}: OtpFormProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isValidOtp = otp.trim().length === 6;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.inputLabel}>{loginContent.otpTitle}</Text>
      <Text style={styles.otpSubtitle}>{loginContent.otpSubtitlePrefix} {target}</Text>
      
      <View
        style={[
          styles.inputWrapper,
          styles.otpInputWrapper,
          isFocused && styles.inputWrapperFocused,
        ]}
      >
        <TextInput
          style={[styles.textInput, styles.otpTextInput]}
          placeholder="000000"
          placeholderTextColor="rgba(161, 161, 170, 0.5)"
          keyboardType="number-pad"
          maxLength={6}
          autoCapitalize="none"
          autoCorrect={false}
          value={otp}
          onChangeText={setOtp}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          editable={!isLoading}
          accessibilityLabel="OTP input field"
        />
      </View>

      {/* Submit OTP Button with Forward Icon */}
      <Animated.View style={[
        styles.buttonWrapper, 
        (!isValidOtp || isLoading) && styles.buttonWrapperDisabled,
        otpBtnAnimatedStyle
      ]}>
        <Pressable
          style={styles.button}
          disabled={!isValidOtp || isLoading}
          onPressIn={() => handlePressIn(otpButtonScale)}
          onPressOut={() => handlePressOut(otpButtonScale)}
          onPress={onSubmit}
        >
          {!isValidOtp ? (
            <View style={styles.buttonDisabled}>
              <Ionicons name="arrow-forward" size={24} color="#a1a1aa" />
            </View>
          ) : (
            <LinearGradient
              colors={[colors.primary, colors.primaryHighlight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Ionicons name="arrow-forward" size={24} color="#ffffff" />
              )}
            </LinearGradient>
          )}
        </Pressable>
      </Animated.View>

      {/* Resend OTP Option */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn&apos;t receive the code? </Text>
        <Pressable
          onPress={onResend}
          disabled={resendTimer > 0 || isLoading}
          style={styles.resendButton}
          accessibilityRole="button"
          accessibilityLabel={resendTimer > 0 ? `Resend code in ${resendTimer} seconds` : "Resend code now"}
        >
          <Text
            style={[
              styles.resendButtonText,
              (resendTimer > 0 || isLoading) && styles.resendButtonTextDisabled,
            ]}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Now'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
