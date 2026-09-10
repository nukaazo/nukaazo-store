import { useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { WebView } from 'react-native-webview';
import { APP_CONFIG } from '@/config';
import {
  addNotificationListeners,
  getExpoPushTokenAsync,
  registerDevicePushTokenWithBackend,
  requestNotificationPermissionAsync,
  unregisterDevicePushTokenWithBackend,
} from '@/services';
import { buildPushTokenInjectionScript } from '../webviewBridge';

export function useWebViewNotificationHandler(webViewRef: RefObject<WebView | null>) {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const lastRegisteredAuthTokenRef = useRef<string | null>(null);

  // Injects push token into WebView
  const injectPushTokenIntoWebView = useCallback(
    (token: string) => {
      if (webViewRef.current && token) {
        webViewRef.current.injectJavaScript(buildPushTokenInjectionScript(token));
      }
    },
    [webViewRef]
  );

  // 1. Initialize notification permissions and obtain Expo push token on startup
  useEffect(() => {
    let isMounted = true;

    const initNotifications = async () => {
      if (!APP_CONFIG.notifications.enabled || !APP_CONFIG.notifications.requestPermissionOnStartup) {
        return;
      }

      try {
        const isGranted = await requestNotificationPermissionAsync();
        if (isGranted && isMounted) {
          const token = await getExpoPushTokenAsync();
          if (token && isMounted) {
            setPushToken(token);
            injectPushTokenIntoWebView(token);
          }
        }
      } catch (error) {
        console.warn('[useWebViewNotificationHandler] Init notification error:', error);
      }
    };

    initNotifications();

    return () => {
      isMounted = false;
    };
  }, [injectPushTokenIntoWebView]);

  // 2. Register push token with Influx Engine backend whenever auth token or push token is available
  useEffect(() => {
    if (pushToken && authToken && lastRegisteredAuthTokenRef.current !== authToken) {
      registerDevicePushTokenWithBackend(pushToken, authToken)
        .then((success) => {
          if (success) {
            lastRegisteredAuthTokenRef.current = authToken;
            console.log('[useWebViewNotificationHandler] Push token successfully registered with backend.');
          }
        })
        .catch((err) => {
          console.warn('[useWebViewNotificationHandler] Backend push registration error:', err);
        });
    }
  }, [pushToken, authToken]);

  // 3. Listen for push notification click events / deep linking
  useEffect(() => {
    const cleanup = addNotificationListeners(
      (notification) => {
        console.log('[useWebViewNotificationHandler] Notification received:', notification.request.content.title);
      },
      (response) => {
        const rawData = response?.notification?.request?.content?.data;
        console.log('[useWebViewNotificationHandler] Notification tapped with data:', rawData);

        if (rawData && (rawData.url || rawData.route || rawData.path)) {
          const targetPath = rawData.url || rawData.route || rawData.path;
          let destinationUrl = targetPath;

          if (targetPath.startsWith('/')) {
            destinationUrl = `${APP_CONFIG.store.baseUrl}${targetPath}`;
          }

          if (webViewRef.current) {
            webViewRef.current.injectJavaScript(
              `window.location.href = ${JSON.stringify(destinationUrl)}; true;`
            );
          }
        }
      }
    );

    return cleanup;
  }, [webViewRef]);

  // Handle user logout
  const handleLogout = useCallback(() => {
    if (pushToken && authToken) {
      unregisterDevicePushTokenWithBackend(pushToken, authToken).catch(() => {});
    }
    setAuthToken(null);
    lastRegisteredAuthTokenRef.current = null;
  }, [pushToken, authToken]);

  return {
    pushToken,
    setPushToken,
    authToken,
    setAuthToken,
    handleLogout,
    injectPushTokenIntoWebView,
  };
}
