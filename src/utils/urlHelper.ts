import { Linking, Alert } from 'react-native';
import { APP_CONFIG } from '@/config';

export async function handleExternalUrl(url: string): Promise<boolean> {
  if (!url) return false;

  const lowerUrl = url.toLowerCase();

  // Check if scheme is external (tel:, mailto:, whatsapp:, upi:, etc.)
  const isExternalScheme = APP_CONFIG.store.externalSchemes.some((scheme) =>
    lowerUrl.startsWith(scheme)
  );

  if (isExternalScheme) {
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

  // Check if URL is an external web link outside allowed hosts
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    const isAllowedHost = APP_CONFIG.store.allowedDomains.some(
      (allowed) => host === allowed || host.endsWith('.' + allowed)
    );

    if (!isAllowedHost) {
      // Open external website in browser or appropriate handler
      await Linking.openURL(url);
      return true;
    }
  } catch {
    // If URL parsing fails, let the webview attempt loading or ignore
  }

  return false;
}
