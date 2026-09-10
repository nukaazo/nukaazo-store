import React from 'react';
import {
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_CONFIG } from '@/config';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import ErrorView from '../common/ErrorView/ErrorView';
import OfflineBanner from '../common/OfflineBanner/OfflineBanner';
import { useStoreWebViewHandler } from './handlers';
import { styles } from './StoreWebView.styles';

export default function StoreWebView() {
  const insets = useSafeAreaInsets();
  const { isOffline } = useNetworkStatus();

  const {
    webViewRef,
    hasError,
    errorMessage,
    bridgeScript,
    handleShouldStartLoad,
    handleNavigationStateChange,
    handleLoadEnd,
    handleReload,
    handleError,
    handleHttpError,
    handleBridgeMessage,
  } = useStoreWebViewHandler();

  // Calculate dynamic top & bottom safe insets
  const topInset = APP_CONFIG.layout.enableTopSafeArea ? insets.top : 0;
  const bottomInset = APP_CONFIG.layout.enableBottomSafeArea ? insets.bottom : 0;

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

      {/* Top Safe Area / Status Bar Spacer */}
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
          geolocationEnabled={true}
          injectedJavaScriptBeforeContentLoaded={bridgeScript}
          injectedJavaScript={bridgeScript}
          onMessage={handleBridgeMessage}
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
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onHttpError={handleHttpError}
        />

        {/* Error / Offline Screen Overlay */}
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

      {/* Bottom Safe Area Spacer */}
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


