import { Linking, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { APP_CONFIG } from '@/config';

/**
 * Checks if the URL is an external protocol scheme (UPI, tel, mailto, etc.)
 */
export function isExternalScheme(url: string): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return APP_CONFIG.store.externalSchemes.some((scheme) =>
    lowerUrl.startsWith(scheme)
  );
}

/**
 * Checks if the URL belongs to an authentication/OAuth provider (Google, Apple, etc.)
 */
export function isAuthUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const authDomains = APP_CONFIG.store.authDomains || [
      'accounts.google.com',
      'appleid.apple.com',
      'accounts.youtube.com',
    ];

    return authDomains.some(
      (domain) => host === domain || host.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

/**
 * Checks if the URL host is permitted inside the in-app webview
 */
export function isAllowedDomain(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    // 1. Always allow host of the configured baseUrl
    try {
      const baseParsed = new URL(APP_CONFIG.store.baseUrl);
      const baseHost = baseParsed.hostname.toLowerCase();
      if (host === baseHost || host.endsWith('.' + baseHost)) {
        return true;
      }
    } catch {}

    // 2. Allow wildcard if specified
    if (APP_CONFIG.store.allowedDomains.includes('*')) {
      return true;
    }

    // 3. Check against allowed domains list
    return APP_CONFIG.store.allowedDomains.some(
      (allowed) => host === allowed.toLowerCase() || host.endsWith('.' + allowed.toLowerCase())
    );
  } catch {
    return false;
  }
}

/**
 * Handles external URI schemes and non-allowed domains
 */
export async function handleExternalUrl(url: string): Promise<boolean> {
  if (!url) return false;

  // Check if scheme is external (tel:, mailto:, whatsapp:, upi:, etc.)
  if (isExternalScheme(url)) {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        return true;
      } else {
        Alert.alert(
          'App Not Available',
          'Could not find a supported application on your device to handle this link.'
        );
        return true;
      }
    } catch {
      return true;
    }
  }

  // Check if URL is an external website outside allowed hosts
  if (!isAllowedDomain(url)) {
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: APP_CONFIG.theme.colors.primary,
        showTitle: true,
        enableBarCollapsing: true,
      });
      return true;
    } catch {
      try {
        await Linking.openURL(url);
        return true;
      } catch {
        return false;
      }
    }
  }

  return false;
}

/**
 * Handles OAuth & Google sign-in using Chrome Custom Tabs / Safari View Controller
 * Ensures device Google accounts and saved credentials are automatically available.
 */
export async function handleAuthUrl(
  url: string,
  returnUrl: string = APP_CONFIG.store.baseUrl
): Promise<{ success: boolean; url?: string }> {
  try {
    const result = await WebBrowser.openAuthSessionAsync(url, returnUrl, {
      toolbarColor: APP_CONFIG.theme.colors.primary,
      secondaryToolbarColor: APP_CONFIG.theme.colors.background,
      showTitle: true,
      enableBarCollapsing: true,
    });

    if (result.type === 'success' && result.url) {
      return { success: true, url: result.url };
    }

    return { success: result.type === 'success' };
  } catch (error) {
    console.warn('Auth session error, falling back to in-app browser:', error);
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: APP_CONFIG.theme.colors.primary,
        showTitle: true,
        enableBarCollapsing: true,
      });
      return { success: true };
    } catch {
      try {
        await Linking.openURL(url);
        return { success: true };
      } catch {
        return { success: false };
      }
    }
  }
}
