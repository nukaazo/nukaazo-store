import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loader from "@/components/common/Loader/Loader";
import ProfileErrorView from "@/components/common/ProfileErrorView/ProfileErrorView";
import { ProfileProvider } from "@/context/ProfileContext";
import {
  useRootLayoutInit,
  useRootLayoutContent,
} from "@/components/layout/handlers/useRootLayoutHandler";

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="ui" options={{ headerShown: false }} />
      <Stack.Screen name="ui/terms" options={{ headerShown: false }} />
      <Stack.Screen name="ui/privacy" options={{ headerShown: false }} />
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
      <ProfileProvider>
        <RootLayoutContent isTokenLoaded={isTokenLoaded} />
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
