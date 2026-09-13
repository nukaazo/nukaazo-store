import Intro from "@/components/intro/Intro";
import { useIntroHandler } from "@/components/intro/handlers/useIntroHandler";
import Splash from "@/components/splash/Splash";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { tokenStorage } from "@/utils/tokenStorage";
import { colors } from "@/theme/colors";

export default function Index() {
  const { isSplashDone, setIsSplashDone, isCheckingAuth, hasToken } = useIntroHandler();

  const token = tokenStorage.get();
  if (token) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]} />
    );
  }

  if (!isSplashDone) {
    return (
      <View style={styles.container}>
        <Splash onFinish={() => setIsSplashDone(true)} />
      </View>
    );
  }

  if (isCheckingAuth && hasToken) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Intro />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcfcfa",
  },
});
