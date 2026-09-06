import React from 'react';
import { StyleSheet, View } from 'react-native';
import Splash from '@/components/splash/Splash';
import StoreWebView from '@/components/webview/StoreWebView';
import { useIntroHandler } from '@/hooks/useIntroHandler';
import { colors } from '@/theme/colors';

export default function Index() {
  const { isSplashDone, setIsSplashDone } = useIntroHandler();

  if (!isSplashDone) {
    return (
      <View style={styles.container}>
        <Splash onFinish={() => setIsSplashDone(true)} />
      </View>
    );
  }

  return <StoreWebView />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
