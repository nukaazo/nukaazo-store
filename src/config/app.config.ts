export const APP_CONFIG = {
  // 1. App General Details
  app: {
    name: 'Nukaazo Store',
    slug: 'nukaazo-store',
    version: '1.0.0',
  },

  // 2. Target Web Store & Domain Configuration
  store: {
    // The main URL the app points to (Change this to point anywhere!)
    baseUrl: 'https://shop.nukaazo.com',

    // Domains permitted within the in-app webview
    allowedDomains: [
      'shop.nukaazo.com',
      'nukaazo.com',
      'www.nukaazo.com',
      'api.nukaazo.com',
      'checkout.razorpay.com',
      'api.razorpay.com',
      'securegw.paytm.in',
      'accounts.google.com',
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

  // 3. Layout & Safe Area Configuration (Responsiveness)
  layout: {
    // Automatically apply padding at the top for status bar / notch / camera cutouts
    enableTopSafeArea: true,

    // Automatically apply padding at the bottom for home indicator / navigation bar
    enableBottomSafeArea: true,

    // Background color for the status bar spacer
    topSafeAreaBackgroundColor: '#fcfcfa',

    // Background color for the bottom navigation bar spacer
    bottomSafeAreaBackgroundColor: '#fcfcfa',
  },

  // 4. Status Bar Configuration
  statusBar: {
    barStyle: 'dark-content' as 'dark-content' | 'light-content',
    backgroundColor: '#fcfcfa',
    translucent: false,
  },

  // 5. Splash Screen Configuration
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

  // 6. Theme & Branding Colors
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

  // 7. Error & Offline Screen Content
  error: {
    offlineHeadline: 'No Internet Connection',
    offlineSubtitle: 'Please check your Wi-Fi or mobile data network.',
    offlineDescription: 'Connect to the internet and tap Retry to continue shopping on Nukaazo.',
    serverErrorHeadline: 'Unable to Load Store',
    serverErrorSubtitle: 'We encountered an error while connecting to the store.',
    serverErrorDescription: 'Please tap the button below to reload.',
    retryButtonText: 'Try Again',
  },

  // 8. Offline Banner Configuration
  offlineBanner: {
    enabled: true,
    message: 'You are currently offline. Check your connection.',
  },

  // 9. Push Notifications Configuration
  notifications: {
    enabled: true,
    requestPermissionOnStartup: true,
  },
};

export type AppConfigType = typeof APP_CONFIG;
