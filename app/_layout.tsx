import Loader from "@/components/common/Loader/Loader";
import ProfileErrorView from "@/components/common/ProfileErrorView/ProfileErrorView";
import { ProfileProvider, useProfile } from "@/context/ProfileContext";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import { tokenStorage } from "@/utils/tokenStorage";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts
} from "@expo-google-fonts/nunito";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold
} from "@expo-google-fonts/poppins";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ROUTES } from "@/helper/routes";

// Prevent the splash screen from auto-hiding before font loading & token loading complete.
SplashScreen.preventAutoHideAsync().catch(() => {});

function RootLayoutContent({ isTokenLoaded }: { isTokenLoaded: boolean }) {
  useRouteGuard(isTokenLoaded);
  const pathname = usePathname();
  const { profile, isLoading, error, fetchProfile, logout } = useProfile();
  const token = tokenStorage.get();

  const isExemptRoute =
    pathname === ROUTES.TERMS ||
    pathname === ROUTES.PRIVACY;

  if (token && (!profile || isLoading) && !isExemptRoute) {
    if (error && !isLoading) {
      return (
        <ProfileErrorView
          error={error}
          onRetry={() => fetchProfile(true)}
          onLogout={() => logout(false)}
        />
      );
    }
    return <Loader />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="ui" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    tokenStorage.loadToken().finally(() => {
      setIsTokenLoaded(true);
    });
  }, []);

  useEffect(() => {
    if ((loaded || error) && isTokenLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error, isTokenLoaded]);

  if ((!loaded && !error) || !isTokenLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <RootLayoutContent isTokenLoaded={isTokenLoaded} />
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
