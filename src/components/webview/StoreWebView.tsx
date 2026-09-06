import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Platform,
  StatusBar,
  ToastAndroid,
  View,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_CONFIG } from '@/config';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { handleExternalUrl } from '@/utils/urlHelper';
import { requestNotificationPermissionAsync } from '@/services/notificationService';
import ErrorView from '../common/ErrorView/ErrorView';
import OfflineBanner from '../common/OfflineBanner/OfflineBanner';
import { styles } from './StoreWebView.styles';

export default function StoreWebView() {
  const webViewRef = useRef<WebView>(null);
  const insets = useSafeAreaInsets();
  const { isOffline } = useNetworkStatus();

  const [canGoBack, setCanGoBack] = useState(false);
  const [, setCanGoForward] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setCurrentUrl] = useState(APP_CONFIG.store.baseUrl);
  const [lastBackPress, setLastBackPress] = useState(0);

  // Request notification permissions on startup if enabled
  useEffect(() => {
    if (APP_CONFIG.notifications.enabled && APP_CONFIG.notifications.requestPermissionOnStartup) {
      requestNotificationPermissionAsync().catch(() => {});
    }
  }, []);

  // Calculate dynamic top & bottom safe insets
  const topInset = APP_CONFIG.layout.enableTopSafeArea ? insets.top : 0;
  const bottomInset = APP_CONFIG.layout.enableBottomSafeArea ? insets.bottom : 0;

  // Hardware Back button handling on Android
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }

      if (APP_CONFIG.store.enableDoubleTapBackToExit) {
        const now = Date.now();
        if (now - lastBackPress < APP_CONFIG.store.doubleTapExitDelayMs) {
          BackHandler.exitApp();
          return true;
        }

        setLastBackPress(now);
        ToastAndroid.show(
          APP_CONFIG.store.doubleTapExitMessage,
          ToastAndroid.SHORT
        );
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack, lastBackPress]);

  // Handle URL intercept & external scheme redirection
  const handleShouldStartLoad = (request: { url: string }) => {
    const { url } = request;

    // Check if this is an external link (UPI, WhatsApp, Tel, external payment, etc.)
    const isCustomScheme = APP_CONFIG.store.externalSchemes.some((scheme) =>
      url.toLowerCase().startsWith(scheme)
    );

    if (isCustomScheme) {
      handleExternalUrl(url);
      return false;
    }

    return true;
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
  };

  const handleReload = useCallback(() => {
    setHasError(false);
    setErrorMessage('');

    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

  // Web platform rendering (fallback for browser / web testing)
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={APP_CONFIG.statusBar.barStyle}
          backgroundColor={APP_CONFIG.statusBar.backgroundColor}
        />
        {APP_CONFIG.offlineBanner.enabled && isOffline && <OfflineBanner />}
        <iframe
          src={APP_CONFIG.store.baseUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title={APP_CONFIG.app.name}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: APP_CONFIG.theme.colors.background },
      ]}
    >
      {/* Native Status Bar */}
      <StatusBar
        barStyle={APP_CONFIG.statusBar.barStyle}
        backgroundColor={APP_CONFIG.statusBar.backgroundColor}
        translucent={APP_CONFIG.statusBar.translucent}
      />

      {/* Top Safe Area / Status Bar Spacer to prevent overlapping notch/battery/charging icons */}
      {topInset > 0 && (
        <View
          style={{
            height: topInset,
            backgroundColor: APP_CONFIG.layout.topSafeAreaBackgroundColor,
            width: '100%',
          }}
        />
      )}

      {/* Offline Banner */}
      {APP_CONFIG.offlineBanner.enabled && isOffline && <OfflineBanner />}

      <View style={styles.innerContainer}>
        {/* Primary Web Content */}
        <WebView
          ref={webViewRef}
          source={{ uri: APP_CONFIG.store.baseUrl }}
          style={styles.webView}
          userAgent={APP_CONFIG.store.userAgent}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={true}
          setSupportMultipleWindows={false}
          javaScriptCanOpenWindowsAutomatically={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          pullToRefreshEnabled={APP_CONFIG.store.enablePullToRefresh}
          nestedScrollEnabled={true}
          automaticallyAdjustContentInsets={false}
          onShouldStartLoadWithRequest={handleShouldStartLoad}
          onNavigationStateChange={handleNavigationStateChange}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            setHasError(true);
            setErrorMessage(
              nativeEvent.description || 'Failed to connect to Nukaazo Store.'
            );
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            if (nativeEvent.statusCode >= 400) {
              setHasError(true);
              setErrorMessage(
                `Server responded with status: ${nativeEvent.statusCode}`
              );
            }
          }}
        />

        {/* Error / Offline Screen Overlay (only when an actual network error occurs) */}
        {hasError && (
          <View style={styles.errorContainer}>
            <ErrorView
              error={errorMessage}
              isOffline={isOffline}
              onRetry={handleReload}
            />
          </View>
        )}
      </View>

      {/* Bottom Safe Area Spacer to prevent overlapping Android navigation bar / iOS home bar */}
      {bottomInset > 0 && (
        <View
          style={{
            height: bottomInset,
            backgroundColor: APP_CONFIG.layout.bottomSafeAreaBackgroundColor,
            width: '100%',
          }}
        />
      )}
    </View>
  );
}
