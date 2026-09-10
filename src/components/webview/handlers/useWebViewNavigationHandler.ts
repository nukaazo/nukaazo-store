import { useCallback, useEffect, useState, ComponentProps, RefObject } from 'react';
import { BackHandler, Platform, ToastAndroid } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { APP_CONFIG } from '@/config';
import {
  handleAuthUrl,
  handleExternalUrl,
  isAllowedDomain,
  isAuthUrl,
  isExternalScheme,
} from '@/utils/urlHelper';

type WebViewOnError = NonNullable<ComponentProps<typeof WebView>['onError']>;
type WebViewOnHttpError = NonNullable<ComponentProps<typeof WebView>['onHttpError']>;
type WebViewErrorEvent = Parameters<WebViewOnError>[0];
type WebViewHttpErrorEvent = Parameters<WebViewOnHttpError>[0];

export function useWebViewNavigationHandler(webViewRef: RefObject<WebView | null>) {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUrl, setCurrentUrl] = useState(APP_CONFIG.store.baseUrl);
  const [lastBackPress, setLastBackPress] = useState(0);

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
  }, [canGoBack, lastBackPress, webViewRef]);

  // Handle URL intercept, auth sessions & external scheme redirection
  const handleShouldStartLoad = useCallback(
    (request: { url: string }) => {
      const { url } = request;

      // 1. Check if this is an external scheme (UPI, WhatsApp, Tel, SMS, etc.)
      if (isExternalScheme(url)) {
        handleExternalUrl(url);
        return false;
      }

      // 2. Check if this is an OAuth / Google Sign-in URL
      if (isAuthUrl(url)) {
        handleAuthUrl(url, APP_CONFIG.store.baseUrl).then((authResult) => {
          if (authResult.success && authResult.url) {
            if (webViewRef.current) {
              webViewRef.current.injectJavaScript(
                `window.location.href = ${JSON.stringify(authResult.url)}; true;`
              );
            }
          } else {
            if (webViewRef.current) {
              webViewRef.current.reload();
            }
          }
        });
        return false;
      }

      // 3. Check if this is an external website outside allowed store domains
      if (!isAllowedDomain(url)) {
        handleExternalUrl(url);
        return false;
      }

      return true;
    },
    [webViewRef]
  );

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
  }, []);

  const handleReload = useCallback(() => {
    setHasError(false);
    setErrorMessage('');

    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, [webViewRef]);

  const handleError = useCallback((syntheticEvent: WebViewErrorEvent) => {
    const { nativeEvent } = syntheticEvent;
    setHasError(true);
    setErrorMessage(
      nativeEvent.description || 'Failed to connect to Nukaazo Store.'
    );
  }, []);

  const handleHttpError = useCallback((syntheticEvent: WebViewHttpErrorEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.statusCode >= 400) {
      setHasError(true);
      setErrorMessage(`Server responded with status: ${nativeEvent.statusCode}`);
    }
  }, []);

  return {
    canGoBack,
    canGoForward,
    hasError,
    errorMessage,
    currentUrl,
    handleShouldStartLoad,
    handleNavigationStateChange,
    handleReload,
    handleError,
    handleHttpError,
  };
}
