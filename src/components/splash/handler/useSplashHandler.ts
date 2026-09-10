import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { APP_CONFIG } from '@/config';

interface UseSplashHandlerProps {
  onFinish: () => void;
}

export function useSplashHandler({ onFinish }: UseSplashHandlerProps) {
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

  return {
    animatedContainerStyle,
    animatedLogoStyle,
    animatedTextStyle,
  };
}
