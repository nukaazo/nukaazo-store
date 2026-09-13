import LoginScreen from '@/components/login/components/LoginScreen';
import { Stack } from 'expo-router';
import React from 'react';
import { tokenStorage } from '@/utils/tokenStorage';
import { colors } from '@/theme/colors';
import { View } from 'react-native';

export default function LoginIndex() {
  const token = tokenStorage.get();
  if (token) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }} />
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginScreen />
    </>
  );
}
