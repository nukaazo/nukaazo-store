import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { APP_CONFIG } from '@/config';
import { styles } from './OfflineBanner.styles';

export default function OfflineBanner() {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: APP_CONFIG.theme.colors.offlineBannerBg },
      ]}
    >
      <Ionicons
        name="cloud-offline-outline"
        size={16}
        color={APP_CONFIG.theme.colors.offlineBannerText}
      />
      <Text
        style={[
          styles.text,
          { color: APP_CONFIG.theme.colors.offlineBannerText },
        ]}
      >
        {APP_CONFIG.offlineBanner.message}
      </Text>
    </View>
  );
}
