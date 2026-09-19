import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loader from "@/components/common/Loader/Loader";
import ProfileErrorView from "@/components/common/ProfileErrorView/ProfileErrorView";
import { ProfileProvider } from "@/context/ProfileContext";
import { ShopProvider } from "@/context/ShopContext";
import {
  useRootLayoutInit,
  useRootLayoutContent,
} from "@/components/layout/handlers/useRootLayoutHandler";
import AppAlertProvider from "@/lib/AppAlert";
import { AppAlertBridge } from "@/lib/AppAlertBridge";

function RootLayoutContent({ isTokenLoaded }: { isTokenLoaded: boolean }) {
  const {
    isLoading,
    isError,
    error,
    handleRetry,
    handleLogout,
  } = useRootLayoutContent(isTokenLoaded);

  if (isError && error) {
    return (
      <ProfileErrorView
        error={error}
        onRetry={handleRetry}
        onLogout={handleLogout}
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 250,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="ui" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const { isReady, isTokenLoaded } = useRootLayoutInit();

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppAlertProvider>
        {/* Bridge: registers show/hide with the appAlert singleton for use in handlers */}
        <AppAlertBridge />
        <ProfileProvider>
          <ShopProvider>
            <RootLayoutContent isTokenLoaded={isTokenLoaded} />
          </ShopProvider>
        </ProfileProvider>
      </AppAlertProvider>
    </SafeAreaProvider>
  );
}
