export const APP_CONFIG = {
  // 1. App General Details
  app: {
    name: 'Nukaazo Store',
    slug: 'nukaazo-store',
    version: '1.0.0',
  },

  // 2. Target Web Store & Domain Configuration
  store: {
    // The main URL the app points to (Change this single URL to point anywhere!)
    baseUrl: 'https://shop.nukaazo.com',

    // Extra domains permitted within the in-app webview
    // (Note: The domain of baseUrl is ALWAYS allowed automatically)
    allowedDomains: [
      'shop.nukaazo.com',
      'nukaazo.com',
      'www.nukaazo.com',
      'api.nukaazo.com',
      'checkout.razorpay.com',
      'api.razorpay.com',
      'securegw.paytm.in',
    ],

    // Auth & OAuth domains to open via Secure In-App Browser (Chrome Custom Tabs / Safari View Controller)
    authDomains: [
      'accounts.google.com',
      'appleid.apple.com',
      'accounts.youtube.com',
    ],

    // Custom user-agent string for identifying app requests
    userAgent:
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 NukaazoStoreApp/1.0.0',

    // Protocols to open via native device apps (UPI, WhatsApp, dialer, etc.)
    externalSchemes: [
      'tel:',
      'mailto:',
      'whatsapp:',
      'sms:',
      'upi:',
      'phonepe:',
      'paytmmp:',
      'gpay:',
      'tez:',
      'bhim:',
    ],

    // Pull to refresh feature
    enablePullToRefresh: true,

    // Hardware back button behavior
    enableDoubleTapBackToExit: true,
    doubleTapExitDelayMs: 2000,
    doubleTapExitMessage: 'Press back again to exit',
  },

  // 3. Web Store Authentication & Session Synchronization
  auth: {
    enabled: true,
    // The key name used in document.cookie and localStorage in the web store
    tokenKey: 'access_token',
    autoSyncAuth: true,
  },

  // 4. Geolocation & Location Permissions Configuration
  location: {
    // Master switch to enable/disable all location features
    enabled: true,
    requestPermissionOnStartup: true,
    enableHighAccuracy: true,
    // Key used in sessionStorage for web store location hydration
    storageKey: 'user_location',
    // Fallback coordinates when location is unavailable
    defaultCoordinates: [18.7067776, 73.6582349] as [number, number],
    // Reverse geocoding configuration
    reverseGeocoding: {
      enabled: true,
      provider: 'both' as 'expo' | 'nominatim' | 'both',
    },
  },

  // 5. Push Notifications & Backend Registration Configuration
  notifications: {
    // Master switch to enable/disable all push notification features
    enabled: true,
    requestPermissionOnStartup: true,
    appType: 'shop',
    // Backend API Base URL for notification registration
    apiBaseUrl: 'https://api.nukaazo.com',
    // Backend Endpoints
    endpoints: {
      register: '/api/v1/device-push/register',
      unregister: '/api/v1/device-push/unregister',
      testSend: '/api/v1/device-push/test-send',
    },
    // Android Notification Channels
    channels: [
      {
        id: 'default',
        name: 'General Notifications',
        importance: 'max' as const,
        sound: 'default',
        vibrate: true,
        lightColor: '#e85c1c',
      },
      {
        id: 'alert_sound',
        name: 'Order Alerts & Urgent Updates',
        importance: 'max' as const,
        sound: 'alert_sound',
        vibrate: true,
        lightColor: '#e85c1c',
      },
      {
        id: 'notification_in',
        name: 'Order Updates',
        importance: 'max' as const,
        sound: 'alert_sound',
        vibrate: true,
        lightColor: '#e85c1c',
      },
      {
        id: 'promotions',
        name: 'Offers & Updates',
        importance: 'high' as const,
        sound: 'default',
        vibrate: true,
        lightColor: '#e85c1c',
      },
    ],
  },

  // 6. Layout & Safe Area Configuration (Responsiveness)
  layout: {
    enableTopSafeArea: true,
    enableBottomSafeArea: true,
    topSafeAreaBackgroundColor: '#fcfcfa',
    bottomSafeAreaBackgroundColor: '#fcfcfa',
  },

  // 7. Status Bar Configuration
  statusBar: {
    barStyle: 'dark-content' as 'dark-content' | 'light-content',
    backgroundColor: '#fcfcfa',
    translucent: false,
  },

  // 8. Splash Screen Configuration
  splash: {
    enabled: true,
    durationMs: 2000,
    logoWidth: 180,
    logoHeight: 180,
    logoFill: '#FFFFFF',
    showBrandText: true,
    brandTextFontSize: 36,
    backgroundColor: '#fcfcfa',
  },

  // 9. Theme & Branding Colors
  theme: {
    colors: {
      primary: '#e85c1c',           // Nukaazo Orange
      primaryHighlight: '#ee6120ff',
      primaryDark: '#9a4a1a',
      secondary: '#006363',         // Nukaazo Teal
      secondaryDark: '#004d4d',
      background: '#fcfcfa',        // Background
      surface: '#ffffff',
      border: '#eaecef',
      textStrong: '#18181b',
      textBody: '#52525b',
      textMuted: '#a1a1aa',
      offlineBannerBg: '#b91c1c',
      offlineBannerText: '#ffffff',
    },
  },

  // 10. Error & Offline Screen Content
  error: {
    offlineHeadline: 'No Internet Connection',
    offlineSubtitle: 'Please check your Wi-Fi or mobile data network.',
    offlineDescription: 'Connect to the internet and tap Retry to continue shopping on Nukaazo.',
    serverErrorHeadline: 'Unable to Load Store',
    serverErrorSubtitle: 'We encountered an error while connecting to the store.',
    serverErrorDescription: 'Please tap the button below to reload.',
    retryButtonText: 'Try Again',
  },

  // 11. Offline Banner Configuration
  offlineBanner: {
    enabled: true,
    message: 'You are currently offline. Check your connection.',
  },
};

export type AppConfigType = typeof APP_CONFIG;
