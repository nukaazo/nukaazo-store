import { LocationData } from '@/services';
import { APP_CONFIG } from '@/config';

export interface BridgeMessage {
  type: 'AUTH_TOKEN' | 'LOGOUT' | 'LOCATION_REQUEST' | 'PUSH_TOKEN_REQUEST' | 'CONSOLE_LOG';
  token?: string | null;
  data?: any;
}

/**
 * Builds the JavaScript string to be injected before content loads and on load.
 * Establishes a bidirectional bridge between React Native and the Web App.
 */
export function buildInjectedBridgeScript(
  initialLocation?: LocationData | null,
  pushToken?: string | null
): string {
  const isLocationEnabled = Boolean(APP_CONFIG.location?.enabled);
  const isNotificationsEnabled = Boolean(APP_CONFIG.notifications?.enabled);
  const isAuthEnabled = Boolean(APP_CONFIG.auth?.enabled);
  const tokenKey = APP_CONFIG.auth?.tokenKey || 'access_token';
  const locationStorageKey = APP_CONFIG.location?.storageKey || 'user_location';

  const serializedLocation =
    isLocationEnabled && initialLocation ? JSON.stringify(initialLocation) : 'null';
  const serializedPushToken =
    isNotificationsEnabled && pushToken ? JSON.stringify(pushToken) : 'null';

  return `
    (function() {
      if (window.__NUKAAZO_BRIDGE_INITIALIZED__) return;
      window.__NUKAAZO_BRIDGE_INITIALIZED__ = true;

      // 1. Store native metadata
      window.__NUKAAZO_NATIVE__ = {
        isNativeApp: true,
        pushToken: ${serializedPushToken},
        location: ${serializedLocation},
        tokenKey: ${JSON.stringify(tokenKey)},
        locationStorageKey: ${JSON.stringify(locationStorageKey)},
      };

      // Helper to post messages back to React Native
      function postToNative(type, payload) {
        if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
          try {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: type, ...payload }));
          } catch (e) {}
        }
      }

      // 2. Hydrate location into sessionStorage if enabled
      ${
        isLocationEnabled
          ? `
      try {
        if (${serializedLocation}) {
          var loc = ${serializedLocation};
          sessionStorage.setItem(${JSON.stringify(locationStorageKey)}, JSON.stringify(loc));
          window.__NUKAAZO_NATIVE_LOCATION__ = loc;
        }
      } catch (e) {}

      // 3. Polyfill Geolocation API with native coordinates for instantaneous response
      if (navigator.geolocation) {
        var originalGetCurrentPosition = navigator.geolocation.getCurrentPosition.bind(navigator.geolocation);
        navigator.geolocation.getCurrentPosition = function(successCallback, errorCallback, options) {
          if (window.__NUKAAZO_NATIVE_LOCATION__ && window.__NUKAAZO_NATIVE_LOCATION__.latitude) {
            var loc = window.__NUKAAZO_NATIVE_LOCATION__;
            successCallback({
              coords: {
                latitude: loc.latitude,
                longitude: loc.longitude,
                accuracy: 10,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null
              },
              timestamp: Date.now()
            });
            return;
          }
          postToNative('LOCATION_REQUEST', {});
          originalGetCurrentPosition(successCallback, errorCallback, options);
        };
      }
      `
          : ''
      }

      // 4. Extract token from cookie or localStorage if auth sync is enabled
      ${
        isAuthEnabled
          ? `
      function getAuthToken() {
        try {
          var match = document.cookie.split('; ').find(function(row) {
            return row.startsWith(${JSON.stringify(tokenKey)} + '=');
          });
          if (match) {
            return decodeURIComponent(match.split('=')[1]);
          }
        } catch (e) {}

        try {
          var localToken = localStorage.getItem(${JSON.stringify(tokenKey)});
          if (localToken) return localToken;
        } catch (e) {}

        return null;
      }

      var lastDetectedToken = null;
      function checkAndBroadcastAuth() {
        var token = getAuthToken();
        if (token && token !== lastDetectedToken) {
          lastDetectedToken = token;
          postToNative('AUTH_TOKEN', { token: token });
        } else if (!token && lastDetectedToken) {
          lastDetectedToken = null;
          postToNative('LOGOUT', {});
        }
      }

      // Check immediately
      checkAndBroadcastAuth();

      // Intercept localStorage.setItem to immediately detect login
      try {
        var originalSetItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = function(key, value) {
          originalSetItem(key, value);
          if (key === ${JSON.stringify(tokenKey)} && value) {
            lastDetectedToken = value;
            postToNative('AUTH_TOKEN', { token: value });
          }
        };

        var originalRemoveItem = localStorage.removeItem.bind(localStorage);
        localStorage.removeItem = function(key) {
          originalRemoveItem(key);
          if (key === ${JSON.stringify(tokenKey)}) {
            lastDetectedToken = null;
            postToNative('LOGOUT', {});
          }
        };
      } catch (e) {}

      // Poll periodically to catch cookie-only updates or asynchronous auth states
      setInterval(checkAndBroadcastAuth, 2000);

      // Listen for URL / history changes
      window.addEventListener('popstate', checkAndBroadcastAuth);
      window.addEventListener('load', checkAndBroadcastAuth);
      `
          : ''
      }

      // Expose native API helper to web app
      window.NukaazoNative = {
        getPushToken: function() {
          return window.__NUKAAZO_NATIVE__.pushToken;
        },
        requestLocation: function() {
          postToNative('LOCATION_REQUEST', {});
        },
        onLocationUpdated: function(location) {
          window.__NUKAAZO_NATIVE_LOCATION__ = location;
          try {
            sessionStorage.setItem(${JSON.stringify(locationStorageKey)}, JSON.stringify(location));
          } catch (e) {}
        }
      };
    })();
    true;
  `;
}

/**
 * Generates script to dynamically update location inside the WebView session.
 */
export function buildLocationInjectionScript(location: LocationData): string {
  if (!APP_CONFIG.location?.enabled) return 'true;';

  const locationStorageKey = APP_CONFIG.location?.storageKey || 'user_location';
  const serialized = JSON.stringify(location);

  return `
    (function() {
      try {
        var loc = ${serialized};
        if (loc) {
          sessionStorage.setItem(${JSON.stringify(locationStorageKey)}, JSON.stringify(loc));
          window.__NUKAAZO_NATIVE_LOCATION__ = loc;
          if (window.NukaazoNative && typeof window.NukaazoNative.onLocationUpdated === 'function') {
            window.NukaazoNative.onLocationUpdated(loc);
          }
          window.dispatchEvent(new CustomEvent('nukaazo:location_updated', { detail: loc }));
        }
      } catch (e) {}
    })();
    true;
  `;
}

/**
 * Generates script to dynamically update push token inside the WebView.
 */
export function buildPushTokenInjectionScript(token: string): string {
  if (!APP_CONFIG.notifications?.enabled) return 'true;';

  return `
    (function() {
      try {
        if (window.__NUKAAZO_NATIVE__) {
          window.__NUKAAZO_NATIVE__.pushToken = ${JSON.stringify(token)};
        }
      } catch (e) {}
    })();
    true;
  `;
}

