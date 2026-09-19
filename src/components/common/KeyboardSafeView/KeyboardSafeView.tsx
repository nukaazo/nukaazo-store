import React from "react";
import { StyleSheet, View, ViewStyle, StyleProp, Platform } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets, EdgeInsets } from "react-native-safe-area-context";

export interface KeyboardSafeViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  includeTopSafe?: boolean;
  includeBottomSafe?: boolean;
}

/**
 * High-performance, 60fps hardware-synchronized keyboard and safe area container.
 * Automatically adapts to any screen dimensions (iPhone SE, Pro Max, Dynamic Island, Android navigation bars).
 */
export const KeyboardSafeView: React.FC<KeyboardSafeViewProps> = ({
  children,
  style,
  contentStyle,
  includeTopSafe = false,
  includeBottomSafe = false,
}) => {
  const insets: EdgeInsets = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard({ isStatusBarTranslucentAndroid: true });

  const animatedKeyboardStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: keyboard.height.value,
    };
  });

  return (
    <View
      style={[
        styles.outerContainer,
        includeTopSafe && { paddingTop: insets.top },
        includeBottomSafe && { paddingBottom: insets.bottom },
        style,
      ]}
    >
      <Animated.View style={[styles.innerAnimated, animatedKeyboardStyle, contentStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  innerAnimated: {
    flex: 1,
  },
});

export default KeyboardSafeView;
