import React from 'react';
import { View, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import Animated from 'react-native-reanimated';
import { APP_CONFIG } from '@/config';
import NukaazoLogo from '../core/NukaazoLogo';
import NukaazoText from '../core/NukaazoText';
import { useSplashHandler } from './handler/useSplashHandler';
import { styles } from './Splash.styles';

interface SplashProps {
  onFinish: () => void;
}

export default function Splash({ onFinish }: SplashProps) {
  const {
    animatedContainerStyle,
    animatedLogoStyle,
    animatedTextStyle,
  } = useSplashHandler({ onFinish });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: APP_CONFIG.splash.backgroundColor },
        animatedContainerStyle,
      ]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        barStyle={APP_CONFIG.statusBar.barStyle}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.content}>
        <Animated.View style={animatedLogoStyle}>
          <NukaazoLogo
            width={APP_CONFIG.splash.logoWidth}
            height={APP_CONFIG.splash.logoHeight}
            fill={APP_CONFIG.splash.logoFill}
          />
        </Animated.View>
        {APP_CONFIG.splash.showBrandText && (
          <Animated.View style={[animatedTextStyle, { marginTop: 20 }]}>
            <NukaazoText
              fontSize={APP_CONFIG.splash.brandTextFontSize}
              fontWeight="800"
            />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
}

