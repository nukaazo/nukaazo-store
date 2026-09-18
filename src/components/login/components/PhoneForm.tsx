import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

import { colors } from '@/theme/colors';
import { loginContent } from '../content/login.content';
// import GoogleIcon from '../icons/GoogleIcon';
import { styles } from '../Login.styles';
import Separator from '../../common/Separator';

interface PhoneFormProps {
  phone: string;
  setPhone: (val: string) => void;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  touched: boolean;
  setTouched: (val: boolean) => void;
  isLoading: boolean;
  isValidPhone: boolean;
  showError: boolean;
  phoneButtonScale: SharedValue<number>;
  phoneBtnAnimatedStyle: any;
  handlePressIn: (scale: SharedValue<number>) => void;
  handlePressOut: (scale: SharedValue<number>) => void;
  handlePhoneSubmit: () => void;
  handleTermsPress: (docName: string) => void;
  // Commented out Google Sign-In props for now
  // isGoogleLoading?: boolean;
  // googleButtonScale?: SharedValue<number>;
  // googleBtnAnimatedStyle?: any;
  // handleGoogleSignIn?: () => void;
}

export default function PhoneForm({
  phone,
  setPhone,
  isFocused,
  setIsFocused,
  touched,
  setTouched,
  isLoading,
  isValidPhone,
  showError,
  phoneButtonScale,
  phoneBtnAnimatedStyle,
  handlePressIn,
  handlePressOut,
  handlePhoneSubmit,
  handleTermsPress,
  // isGoogleLoading = false,
  // googleButtonScale,
  // googleBtnAnimatedStyle,
  // handleGoogleSignIn,
}: PhoneFormProps) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.inputLabel}>{loginContent.phoneLabel}</Text>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          showError && styles.inputWrapperError
        ]}
      >
        <Ionicons
          name="phone-portrait-outline"
          size={20}
          color={showError ? '#ef4444' : (isFocused ? colors.primary : '#a1a1aa')}
          style={styles.inputIcon}
        />
        <Separator orientation="vertical" style={styles.verticalSeparator} />
        <TextInput
          style={styles.textInput}
          placeholder={loginContent.phonePlaceholder}
          placeholderTextColor="rgba(161, 161, 170, 0.7)"
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (touched) setTouched(false);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setTouched(true);
          }}
          editable={!isLoading}
          accessibilityLabel="Phone number input field"
        />

        {phone.length > 0 && !isLoading && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setPhone('')}
            accessibilityLabel="Clear phone number text"
          >
            <Ionicons name="close-circle" size={18} color="#a1a1aa" />
          </TouchableOpacity>
        )}
      </View>

      {showError && (
        <Text style={styles.errorText}>{loginContent.phoneInvalidError}</Text>
      )}

      {/* Submit Phone Button */}
      <Animated.View style={[
        styles.buttonWrapper, 
        (!isValidPhone || isLoading) && styles.buttonWrapperDisabled,
        phoneBtnAnimatedStyle
      ]}>
        <Pressable
          style={styles.button}
          disabled={!isValidPhone || isLoading}
          onPressIn={() => handlePressIn(phoneButtonScale)}
          onPressOut={() => handlePressOut(phoneButtonScale)}
          onPress={handlePhoneSubmit}
        >
          {!isValidPhone ? (
            <View style={styles.buttonDisabled}>
              <Text style={[styles.buttonText, styles.buttonTextDisabled]}>
                {loginContent.signInButtonText}
              </Text>
            </View>
          ) : (
            <LinearGradient
              colors={[colors.primary, colors.primaryHighlight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              {isLoading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text style={styles.buttonText}>{loginContent.sendingOtpButtonText}</Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.buttonText}>{loginContent.signInButtonText}</Text>
                  <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                </View>
              )}
            </LinearGradient>
          )}
        </Pressable>
      </Animated.View>

      {/* 
      // =========================================================================
      // Google OAuth and Divider commented out as per requirement:
      // "for email and google oAuth comment it for now."
      // =========================================================================
      
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{loginContent.dividerText}</Text>
        <View style={styles.dividerLine} />
      </View>

      {googleBtnAnimatedStyle && googleButtonScale && handleGoogleSignIn && (
        <Animated.View style={googleBtnAnimatedStyle}>
          <Pressable
            style={[styles.googleButton, (isLoading || isGoogleLoading) && { opacity: 0.6 }]}
            disabled={isLoading || isGoogleLoading}
            onPressIn={() => handlePressIn(googleButtonScale)}
            onPressOut={() => handlePressOut(googleButtonScale)}
            onPress={handleGoogleSignIn}
          >
            {isGoogleLoading ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : (
              <>
                <GoogleIcon size={22} />
                <Text style={styles.googleButtonText}>{loginContent.googleButtonText}</Text>
              </>
            )}
          </Pressable>
        </Animated.View>
      )}
      */}

      {/* Footer / Terms */}
      <View style={styles.footerContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree to Nukaazo&apos;s{' '}
          <Text 
            style={styles.termsLink} 
            onPress={() => handleTermsPress('Terms of Service')}
          >
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text 
            style={styles.termsLink} 
            onPress={() => handleTermsPress('Privacy Policy')}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}
