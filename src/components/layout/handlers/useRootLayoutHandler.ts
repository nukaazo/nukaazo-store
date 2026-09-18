import { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/nunito';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import {
  Kalam_400Regular,
  Kalam_700Bold,
} from '@expo-google-fonts/kalam';
import { tokenStorage } from '@/utils/tokenStorage';
import { useProfile } from '@/context/ProfileContext';
import { useRouteGuard } from '@/hooks/useRouteGuard';
import { isExemptRoute } from '@/helper/routes';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => {});

/**
 * Hook to manage RootLayout initialization (fonts, persistent token loading, splash screen lifecycle)
 */
export function useRootLayoutInit() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Kalam_400Regular,
    Kalam_700Bold,
  });

  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    // Pre-load authenticated token from persistence into memory
    tokenStorage.loadToken().finally(() => {
      setIsTokenLoaded(true);
    });
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && isTokenLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError, isTokenLoaded]);

  const isReady = (fontsLoaded || fontError) && isTokenLoaded;

  return {
    isReady,
    isTokenLoaded,
  };
}

/**
 * Hook to manage RootLayoutContent authentication gate, loading screens, and error views
 */
export function useRootLayoutContent(isTokenLoaded: boolean) {
  useRouteGuard(isTokenLoaded);
  const pathname = usePathname();
  const { profile, isLoading, error, fetchProfile, logout } = useProfile();
  const token = tokenStorage.get();

  const isExempt = isExemptRoute(pathname);
  const isProfileLoading = token && (!profile || isLoading) && !isExempt;
  const isProfileError = Boolean(token && error && !isLoading && !isExempt);

  const handleRetry = () => {
    fetchProfile(true);
  };

  const handleLogout = () => {
    logout(false);
  };

  return {
    token,
    profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error,
    handleRetry,
    handleLogout,
  };
}

export default {
  useRootLayoutInit,
  useRootLayoutContent,
};
