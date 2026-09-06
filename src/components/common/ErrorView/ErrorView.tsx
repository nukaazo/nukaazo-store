import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { APP_CONFIG } from '@/config';
import { styles } from './ErrorView.styles';

export interface ErrorViewProps {
  error?: string;
  onRetry: () => void;
  isOffline?: boolean;
}

export default function ErrorView({
  error,
  onRetry,
  isOffline = false,
}: ErrorViewProps) {
  const { colors } = APP_CONFIG.theme;
  const {
    offlineHeadline,
    offlineSubtitle,
    offlineDescription,
    serverErrorHeadline,
    serverErrorSubtitle,
    serverErrorDescription,
    retryButtonText,
  } = APP_CONFIG.error;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.iconOuterRing}>
          <View style={styles.iconInnerCircle}>
            <Ionicons
              name={isOffline ? 'cloud-offline-outline' : 'alert-circle-outline'}
              size={36}
              color={colors.primary}
            />
          </View>
        </View>

        <Text style={styles.headline}>
          {isOffline ? offlineHeadline : serverErrorHeadline}
        </Text>
        <Text style={styles.subtitle}>
          {isOffline ? offlineSubtitle : serverErrorSubtitle}
        </Text>
        <Text style={styles.description}>
          {isOffline ? offlineDescription : serverErrorDescription}
        </Text>

        {error && !isOffline ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorBoxText}>{error}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.retryButtonWrapper,
            pressed && styles.retryButtonPressed,
          ]}
          onPress={onRetry}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryHighlight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.retryButtonGradient}
          >
            <Ionicons name="refresh-outline" size={20} color="#ffffff" />
            <Text style={styles.retryButtonText}>{retryButtonText}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
