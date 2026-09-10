import { useCallback, useMemo, useRef } from 'react';
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { buildInjectedBridgeScript, buildLocationInjectionScript } from '../webviewBridge';
import { useWebViewLocationHandler } from './useWebViewLocationHandler';
import { useWebViewNotificationHandler } from './useWebViewNotificationHandler';
import { useWebViewNavigationHandler } from './useWebViewNavigationHandler';

export function useStoreWebViewHandler() {
  const webViewRef = useRef<WebView>(null);

  // 1. Location Sub-handler
  const {
    locationData,
    isLocationLoading,
    refreshLocation,
    injectLocationIntoWebView,
  } = useWebViewLocationHandler(webViewRef);

  // 2. Notification & Backend Registration Sub-handler
  const {
    pushToken,
    authToken,
    setAuthToken,
    handleLogout,
    injectPushTokenIntoWebView,
  } = useWebViewNotificationHandler(webViewRef);

  // 3. Navigation & Error Sub-handler
  const {
    canGoBack,
    canGoForward,
    hasError,
    errorMessage,
    currentUrl,
    handleShouldStartLoad,
    handleNavigationStateChange: baseHandleNavigationStateChange,
    handleReload,
    handleError,
    handleHttpError,
  } = useWebViewNavigationHandler(webViewRef);

  // 4. Memoized Injected Bridge Script
  const bridgeScript = useMemo(() => {
    return buildInjectedBridgeScript(locationData, pushToken);
  }, [locationData, pushToken]);

  // 5. Injected script re-application on navigation state change
  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      baseHandleNavigationStateChange(navState);

      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(bridgeScript);
        if (locationData) {
          webViewRef.current.injectJavaScript(buildLocationInjectionScript(locationData));
        }
      }
    },
    [baseHandleNavigationStateChange, bridgeScript, locationData]
  );

  // 6. Handle onLoadEnd event
  const handleLoadEnd = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(bridgeScript);
      if (locationData) {
        webViewRef.current.injectJavaScript(buildLocationInjectionScript(locationData));
      }
    }
  }, [bridgeScript, locationData]);

  // 7. Message Router from WebView JS Bridge
  const handleBridgeMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        if (!message || !message.type) return;

        switch (message.type) {
          case 'AUTH_TOKEN': {
            const detectedToken = message.token;
            if (detectedToken && detectedToken !== authToken) {
              setAuthToken(detectedToken);
            }
            break;
          }

          case 'LOGOUT': {
            handleLogout();
            break;
          }

          case 'LOCATION_REQUEST': {
            await refreshLocation();
            break;
          }

          case 'PUSH_TOKEN_REQUEST': {
            if (pushToken) {
              injectPushTokenIntoWebView(pushToken);
            }
            break;
          }

          default:
            break;
        }
      } catch {
        // Ignore non-JSON bridge payloads
      }
    },
    [authToken, handleLogout, injectPushTokenIntoWebView, pushToken, refreshLocation, setAuthToken]
  );

  return {
    webViewRef,
    locationData,
    isLocationLoading,
    pushToken,
    authToken,
    canGoBack,
    canGoForward,
    hasError,
    errorMessage,
    currentUrl,
    bridgeScript,
    handleShouldStartLoad,
    handleNavigationStateChange,
    handleLoadEnd,
    handleReload,
    handleError,
    handleHttpError,
    handleBridgeMessage,
  };
}
