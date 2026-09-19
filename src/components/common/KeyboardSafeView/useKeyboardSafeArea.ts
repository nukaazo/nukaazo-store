import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";
import { useSafeAreaInsets, EdgeInsets } from "react-native-safe-area-context";

export interface UseKeyboardSafeAreaResult {
  keyboardVisible: boolean;
  keyboardHeight: number;
  insets: EdgeInsets;
  bottomInset: number;
  dismissKeyboard: () => void;
}

/**
 * Universal hook for responsive keyboard and safe area handling across all phone models.
 * Automatically handles iOS notch/island insets, Android soft navigation bars, and IME keyboard events.
 */
export function useKeyboardSafeArea(): UseKeyboardSafeAreaResult {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = (e: KeyboardEvent) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onHide = () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const bottomInset = keyboardVisible ? 0 : Math.max(insets.bottom, 12);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return {
    keyboardVisible,
    keyboardHeight,
    insets,
    bottomInset,
    dismissKeyboard,
  };
}

export default useKeyboardSafeArea;
