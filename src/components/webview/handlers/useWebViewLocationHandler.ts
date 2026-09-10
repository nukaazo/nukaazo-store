import { useCallback, useEffect, useState, RefObject } from 'react';
import { WebView } from 'react-native-webview';
import { APP_CONFIG } from '@/config';
import {
  getCurrentLocationDataAsync,
  LocationData,
  requestLocationPermissionAsync,
} from '@/services';
import { buildLocationInjectionScript } from '../webviewBridge';

export function useWebViewLocationHandler(webViewRef: RefObject<WebView | null>) {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  // Injects location data into WebView
  const injectLocationIntoWebView = useCallback(
    (loc: LocationData) => {
      if (webViewRef.current && loc) {
        webViewRef.current.injectJavaScript(buildLocationInjectionScript(loc));
      }
    },
    [webViewRef]
  );

  // Fetch fresh device location and optionally inject into WebView
  const refreshLocation = useCallback(async (): Promise<LocationData | null> => {
    setIsLocationLoading(true);
    try {
      const loc = await getCurrentLocationDataAsync();
      if (loc) {
        setLocationData(loc);
        injectLocationIntoWebView(loc);
      }
      return loc;
    } catch (error) {
      console.warn('[useWebViewLocationHandler] Error refreshing location:', error);
      return null;
    } finally {
      setIsLocationLoading(false);
    }
  }, [injectLocationIntoWebView]);

  // Initialize location on startup / session creation
  useEffect(() => {
    let isMounted = true;

    const initLocation = async () => {
      if (!APP_CONFIG.location.enabled || !APP_CONFIG.location.requestPermissionOnStartup) {
        return;
      }

      try {
        const isGranted = await requestLocationPermissionAsync();
        if (isGranted && isMounted) {
          const loc = await getCurrentLocationDataAsync();
          if (loc && isMounted) {
            setLocationData(loc);
            injectLocationIntoWebView(loc);
          }
        }
      } catch (error) {
        console.warn('[useWebViewLocationHandler] Init location error:', error);
      }
    };

    initLocation();

    return () => {
      isMounted = false;
    };
  }, [injectLocationIntoWebView]);

  return {
    locationData,
    setLocationData,
    isLocationLoading,
    refreshLocation,
    injectLocationIntoWebView,
  };
}
