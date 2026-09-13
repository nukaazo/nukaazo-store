import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { ROUTES } from '@/helper/routes';
import { profileErrorViewContent } from './content/profileErrorView.content';
import { styles } from './ProfileErrorView.styles';

export interface ProfileErrorViewProps {
  error: string;
  onRetry: () => void;
  onLogout: () => void;
}

export default function ProfileErrorView({ error, onRetry, onLogout }: ProfileErrorViewProps) {
  const router = useRouter();

  const handleContactSupport = () => {
    // In store app, route to support or alert
  };

  return (
    <View style={styles.container}>
      <View style={styles.decorCircleOrange} pointerEvents="none" />
      <View style={styles.decorCircleTeal} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.iconOuterRing}>
            <View style={styles.iconInnerCircle}>
              <Ionicons name="cloud-offline-outline" size={40} color={colors.primary} />
            </View>
            <View style={styles.statusBadge}>
              <Ionicons name="alert" size={14} color="#ffffff" />
            </View>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.headline}>{profileErrorViewContent.headline}</Text>
            <Text style={styles.subtitle}>{profileErrorViewContent.subtitle}</Text>
            <Text style={styles.description}>{profileErrorViewContent.description}</Text>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <View style={styles.errorBoxHeader}>
                <Ionicons name="warning-outline" size={14} color="#b91c1c" />
                <Text style={styles.errorBoxLabel}>
                  {profileErrorViewContent.errorDetailsLabel}
                </Text>
              </View>
              <Text style={styles.errorBoxText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.actionContainer}>
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
                <Text style={styles.retryButtonText}>
                  {profileErrorViewContent.retryButtonText}
                </Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.signOutButton,
                pressed && styles.signOutButtonPressed,
              ]}
              onPress={onLogout}
            >
              <Ionicons name="log-out-outline" size={16} color={colors.textMutedDark} />
              <Text style={styles.signOutButtonText}>
                {profileErrorViewContent.signOutButtonText}
              </Text>
            </Pressable>

            <Text style={styles.troubleshootText}>
              {profileErrorViewContent.troubleshootPrefix}
              <Text
                style={styles.contactSupportLink}
                onPress={handleContactSupport}
              >
                {profileErrorViewContent.contactSupportLink}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
