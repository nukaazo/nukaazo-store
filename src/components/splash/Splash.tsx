import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import { Stack } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import NukaazoLogo from "../core/NukaazoLogo";
import { styles } from "./Splash.styles";

interface SplashProps {
  onFinish: () => void;
}

export default function Splash({ onFinish }: SplashProps) {
  const logoScale = useSharedValue(0.6);
  const logoOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    // 1. Entrance animation for the logo
    logoScale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.back(1.5)),
    });
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // 2. Schedule exit fade out of the container after 2.0 seconds
    const timer = setTimeout(() => {
      containerOpacity.value = withTiming(
        0,
        {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        },
        (finished) => {
          if (finished) {
            runOnJS(onFinish)();
          }
        }
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, containerOpacity, onFinish]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.content}>
        <Animated.View style={animatedLogoStyle}>
          <NukaazoLogo width={180} height={180} fill="#FFFFFF" />
        </Animated.View>
      </View>
    </Animated.View>
  );
}
