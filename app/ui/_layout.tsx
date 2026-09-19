import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { colors } from '@/theme/colors';
import { useUiLayoutHandler } from '@/components/layout/handlers/useUiLayoutHandler';

export default function Layout() {
  const {
    keyboardVisible,
    verticalOffset,
    isOverlayLoading,
  } = useUiLayoutHandler();

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} translucent={false} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : (keyboardVisible ? 'height' : undefined)}
        keyboardVerticalOffset={verticalOffset}
      >
        <View style={{ flex: 1, height: '100%', width: '100%', position: 'relative' }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="dashboard/index" options={{ headerShown: false }} />
            <Stack.Screen name="create-shop/index" options={{ headerShown: false }} />
            <Stack.Screen name="terms/index" options={{ headerShown: false }} />
            <Stack.Screen name="privacy/index" options={{ headerShown: false }} />
          </Stack>

          {isOverlayLoading && (
            <View
              style={[
                StyleSheet.absoluteFill,
                { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
              ]}
            >
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
