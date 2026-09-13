import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

import { colors } from '@/theme/colors';
import { loginContent } from '../content/login.content';
import { styles } from '../Login.styles';

interface DetailsFormProps {
  email: string;
  fullName: string;
  setFullName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  isLoading: boolean;
  detailsButtonScale: SharedValue<number>;
  detailsBtnAnimatedStyle: any;
  handlePressIn: (scale: SharedValue<number>) => void;
  handlePressOut: (scale: SharedValue<number>) => void;
  handleDetailsSubmit: () => void;
  isNameSaved: boolean;
  handleSaveName: () => void;
}

export default function DetailsForm({
  email,
  fullName,
  setFullName,
  phone,
  setPhone,
  isLoading,
  detailsButtonScale,
  detailsBtnAnimatedStyle,
  handlePressIn,
  handlePressOut,
  handleDetailsSubmit,
  isNameSaved,
  handleSaveName,
}: DetailsFormProps) {
  const [focusedField, setFocusedField] = useState<'name' | 'phone' | null>(null);

  const isNameValid = fullName.trim().length >= 3;
  const isPhoneValid = phone.trim().length >= 10;

  return (
    <View style={[styles.formContainer, { marginTop: 12 }]}>
      
      {/* Full Name Section */}
      <View style={styles.fieldLabelContainer}>
        <Ionicons name="person-outline" size={18} color="#52525b" />
        <Text style={styles.fieldLabelText}>{loginContent.fullNameLabel}</Text>
      </View>
      <View style={styles.inputRow}>
        <View
          style={[
            styles.inputWrapper,
            { flex: 1, marginBottom: 0 },
            focusedField === 'name' && styles.inputWrapperFocused,
            isNameSaved && { opacity: 0.75 }
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder={loginContent.fullNamePlaceholder}
            placeholderTextColor="rgba(161, 161, 170, 0.7)"
            autoCapitalize="words"
            autoCorrect={false}
            value={fullName}
            onChangeText={(text) => {
              if (!isNameSaved) setFullName(text);
            }}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            editable={!isLoading && !isNameSaved}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.sideButton, 
            styles.sideButtonCheck, 
            isNameValid && !isNameSaved && styles.sideButtonActive,
            isNameSaved && { backgroundColor: colors.tealTint }
          ]}
          disabled={!isNameValid || isNameSaved || isLoading}
          onPress={handleSaveName}
          accessibilityLabel="Confirm Name"
        >
          <Ionicons 
            name={isNameSaved ? "checkmark-circle" : "checkmark"} 
            size={24} 
            color={isNameSaved ? colors.secondary : (isNameValid ? '#ffffff' : '#a1a1aa')} 
          />
        </TouchableOpacity>
      </View>

      {/* Email Section (Disabled) */}
      <View style={styles.fieldLabelContainer}>
        <Ionicons name="mail-outline" size={18} color="#52525b" />
        <Text style={styles.fieldLabelText}>{loginContent.emailLabel}</Text>
      </View>
      <View style={[styles.inputWrapper, { opacity: 0.7, marginBottom: 20 }]}>
        <TextInput
          style={styles.textInput}
          value={email}
          editable={false}
        />
        <Ionicons name="checkmark-circle" size={24} color="#10b981" />
      </View>

      {/* Phone Number Section */}
      <View style={styles.fieldLabelContainer}>
        <Ionicons name="phone-portrait-outline" size={18} color="#52525b" />
        <Text style={styles.fieldLabelText}>{loginContent.phoneLabel}</Text>
      </View>
      <View style={styles.inputRow}>
        <View
          style={[
            styles.inputWrapper,
            { flex: 1, marginBottom: 0 },
            focusedField === 'phone' && styles.inputWrapperFocused,
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder={loginContent.phonePlaceholder}
            placeholderTextColor="rgba(161, 161, 170, 0.7)"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            editable={!isLoading}
          />
        </View>
        <TouchableOpacity
          style={[styles.sideButton, isPhoneValid && styles.sideButtonActive]}
          disabled={!isPhoneValid || !isNameValid || isLoading}
          onPress={handleDetailsSubmit}
          accessibilityLabel="Send OTP"
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={[styles.sideButtonText, isPhoneValid && isNameValid ? { color: '#ffffff' } : { color: '#a1a1aa' }]}>
              {loginContent.sendOtpButtonText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
