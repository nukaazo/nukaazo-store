import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

import { colors } from '@/theme/colors';
import { loginContent } from '../content/login.content';
import GoogleIcon from '../icons/GoogleIcon';
import { styles } from '../Login.styles';
import Separator from '../../common/Separator';

interface EmailFormProps {
  email: string;
  setEmail: (val: string) => void;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  touched: boolean;
  setTouched: (val: boolean) => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  isValidEmail: boolean;
  showError: boolean;
  emailButtonScale: SharedValue<number>;
  googleButtonScale: SharedValue<number>;
  emailBtnAnimatedStyle: any;
  googleBtnAnimatedStyle: any;
  handlePressIn: (scale: SharedValue<number>) => void;
  handlePressOut: (scale: SharedValue<number>) => void;
  handleEmailSubmit: () => void;
  handleGoogleSignIn: () => void;
  handleTermsPress: (docName: string) => void;
}

export default function EmailForm({
  email,
  setEmail,
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
  emailBtnAnimatedStyle,
  googleBtnAnimatedStyle,
  handlePressIn,
  handlePressOut,
  handleEmailSubmit,
  handleGoogleSignIn,
  handleTermsPress
}: EmailFormProps) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.inputLabel}>{loginContent.emailLabel}</Text>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          showError && styles.inputWrapperError
        ]}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={showError ? '#ef4444' : (isFocused ? colors.primary : '#a1a1aa')}
          style={styles.inputIcon}
        />
        <Separator orientation="vertical" style={styles.verticalSeparator} />
        <TextInput
          style={styles.textInput}
          placeholder={loginContent.emailPlaceholder}
          placeholderTextColor="rgba(161, 161, 170, 0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (touched) setTouched(false);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setTouched(true);
          }}
          editable={!isLoading && !isGoogleLoading}
          accessibilityLabel="Email input field"
        />

        {email.length > 0 && !isLoading && !isGoogleLoading && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setEmail('')}
            accessibilityLabel="Clear email text"
          >
            <Ionicons name="close-circle" size={18} color="#a1a1aa" />
          </TouchableOpacity>
        )}
      </View>

      {showError && (
        <Text style={styles.errorText}>Please enter a valid email address</Text>
      )}

      {/* Submit Email Button */}
      <Animated.View style={[
        styles.buttonWrapper, 
        (!isValidEmail || isLoading || isGoogleLoading) && styles.buttonWrapperDisabled,
        emailBtnAnimatedStyle
      ]}>
        <Pressable
          style={styles.button}
          disabled={!isValidEmail || isLoading || isGoogleLoading}
          onPressIn={() => handlePressIn(emailButtonScale)}
          onPressOut={() => handlePressOut(emailButtonScale)}
          onPress={handleEmailSubmit}
        >
          {!isValidEmail ? (
            <View style={styles.buttonDisabled}>
              <Text style={[styles.buttonText, styles.buttonTextDisabled]}>
                {loginContent.continueButtonText}
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
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.buttonText}>{loginContent.continueButtonText}</Text>
              )}
            </LinearGradient>
          )}
        </Pressable>
      </Animated.View>

      {/* OR Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{loginContent.dividerText}</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Button */}
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
