import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '@/context/ProfileContext';
import { isExemptRoute } from '@/helper/routes';

export function useUiLayoutHandler() {
  const pathname = usePathname();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { profile, isLoading: isProfileLoading } = useProfile();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const isExempt = isExemptRoute(pathname);
  const verticalOffset = Platform.OS === 'ios' ? insets.top : 0;
  const isOverlayLoading = isProfileLoading && !profile && !isExempt;

  return {
    pathname,
    keyboardVisible,
    verticalOffset,
    isOverlayLoading,
  };
}

export default useUiLayoutHandler;
