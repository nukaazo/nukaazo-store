import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { APP_CONFIG } from '@/config';
import NukaazoLogo from '../core/NukaazoLogo';
import NukaazoText from '../core/NukaazoText';
import { styles } from './Splash.styles';

interface SplashProps {
  onFinish: () => void;
}

export default function Splash({ onFinish }: SplashProps) {
  const logoScale = useSharedValue(0.6);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    // 1. Entrance animation for the logo
    logoScale.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.back(1.5)),
    });
    logoOpacity.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.ease),
    });

    // 2. Entrance for text
    if (APP_CONFIG.splash.showBrandText) {
      setTimeout(() => {
        textOpacity.value = withTiming(1, {
          duration: 600,
          easing: Easing.out(Easing.ease),
        });
      }, 300);
    }

    // 3. Exit fade out of the container after configured duration
    const timer = setTimeout(() => {
      containerOpacity.value = withTiming(
        0,
        {
          duration: 350,
          easing: Easing.inOut(Easing.ease),
        },
        (finished) => {
          if (finished) {
            runOnJS(onFinish)();
          }
        }
      );
    }, APP_CONFIG.splash.durationMs);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, textOpacity, containerOpacity, onFinish]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

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
