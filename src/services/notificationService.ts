import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { APP_CONFIG } from '@/config';

let Notifications: any = null;
const isExpoGo =
  Constants.executionEnvironment === 'storeClient' ||
  (Constants as any).appOwnership === 'expo';

// In Expo Go SDK 53+, remote notifications must not be initialized directly
if (!isExpoGo && Platform.OS !== 'web') {
  try {
    Notifications = require('expo-notifications');
  } catch (e) {
    console.warn('[NotificationService] expo-notifications module could not be loaded:', e);
  }
}

if (Notifications) {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  } catch (e) {
    console.warn('[NotificationService] Failed to set notification handler:', e);
  }
}

/**
 * Sets up Android notification channels for normal, urgent order, and promotional alerts.
 */
export async function setupNotificationChannelsAsync(): Promise<void> {
  if (Platform.OS !== 'android' || !Notifications || !APP_CONFIG.notifications.enabled) {
    return;
  }

  try {
    const configuredChannels = APP_CONFIG.notifications.channels || [];

    for (const ch of configuredChannels) {
      const importanceMap = {
        max: Notifications.AndroidImportance.MAX,
        high: Notifications.AndroidImportance.HIGH,
        default: Notifications.AndroidImportance.DEFAULT,
        low: Notifications.AndroidImportance.LOW,
        min: Notifications.AndroidImportance.MIN,
      };

      await Notifications.setNotificationChannelAsync(ch.id, {
        name: ch.name,
        importance: importanceMap[ch.importance] ?? Notifications.AndroidImportance.MAX,
        vibrationPattern: ch.vibrate ? [0, 250, 250, 250] : undefined,
        lightColor: ch.lightColor || APP_CONFIG.theme.colors.primary,
        sound: ch.sound === 'default' ? 'default' : ch.sound,
        enableVibrate: ch.vibrate,
        showBadge: true,
      });
    }
  } catch (error) {
    console.warn('[NotificationService] Failed to create notification channels:', error);
  }
}

/**
 * Requests notification permissions from the user.
 */
export async function requestNotificationPermissionAsync(): Promise<boolean> {
  if (Platform.OS === 'web' || isExpoGo || !Notifications || !APP_CONFIG.notifications.enabled) {
    return false;
  }

  try {
    await setupNotificationChannelsAsync();

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.warn('[NotificationService] Error requesting notification permission:', error);
    return false;
  }
}

/**
 * Retrieves the device's Expo Push Token for sending remote push notifications.
 */
export async function getExpoPushTokenAsync(): Promise<string | null> {
  if (Platform.OS === 'web' || isExpoGo || !Notifications || !APP_CONFIG.notifications.enabled) {
    return null;
  }

  try {
    const isGranted = await requestNotificationPermissionAsync();
    if (!isGranted) {
      console.log('[NotificationService] Notification permission not granted');
      return null;
    }

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    const tokenData = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );
    console.log('[NotificationService] Expo Push Token obtained:', tokenData.data);
    return tokenData.data;
  } catch (error) {
    console.warn('[NotificationService] Error fetching push token:', error);
    return null;
  }
}

/**
 * Registers the device push token with the Influx Engine backend.
 */
export async function registerDevicePushTokenWithBackend(
  pushToken: string,
  authToken?: string | null
): Promise<boolean> {
  if (!pushToken || !APP_CONFIG.notifications.enabled) {
    return false;
  }

  const baseUrl = APP_CONFIG.notifications.apiBaseUrl || 'https://api.nukaazo.com';
  const registerEndpoint =
    APP_CONFIG.notifications.endpoints?.register || '/api/v1/device-push/register';

  const endpoints = [
    `${baseUrl}${registerEndpoint.startsWith('/') ? '' : '/'}${registerEndpoint}`,
  ];

  // Also add fallback if /api/v1 is used
  if (registerEndpoint.startsWith('/api/v1')) {
    endpoints.push(`${baseUrl}${registerEndpoint.replace('/api/v1', '/v1')}`);
  }

  const payload = {
    token: pushToken,
    platform: Platform.OS,
    appType: APP_CONFIG.notifications.appType || 'customer',
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(`[NotificationService] Successfully registered push token with backend via ${url}`);
        return true;
      }

      if (response.status === 401 && !authToken) {
        console.log('[NotificationService] Backend registration requires authentication; waiting for user login.');
        return false;
      }
    } catch (error) {
      console.warn(`[NotificationService] Attempt to register with ${url} failed:`, error);
    }
  }

  return false;
}

/**
 * Unregisters the device push token with the Influx Engine backend.
 */
export async function unregisterDevicePushTokenWithBackend(
  pushToken: string,
  authToken?: string | null
): Promise<boolean> {
  if (!pushToken || !APP_CONFIG.notifications.enabled) {
    return false;
  }

  const baseUrl = APP_CONFIG.notifications.apiBaseUrl || 'https://api.nukaazo.com';
  const unregisterEndpoint =
    APP_CONFIG.notifications.endpoints?.unregister || '/api/v1/device-push/unregister';

  const endpoints = [
    `${baseUrl}${unregisterEndpoint.startsWith('/') ? '' : '/'}${unregisterEndpoint}`,
  ];

  if (unregisterEndpoint.startsWith('/api/v1')) {
    endpoints.push(`${baseUrl}${unregisterEndpoint.replace('/api/v1', '/v1')}`);
  }

  const payload = {
    token: pushToken,
    platform: Platform.OS,
    appType: APP_CONFIG.notifications.appType || 'customer',
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('[NotificationService] Successfully unregistered push token from backend');
        return true;
      }
    } catch (error) {
      console.warn(`[NotificationService] Attempt to unregister with ${url} failed:`, error);
    }
  }

  return false;
}

/**
 * Attaches notification listeners for incoming notifications and tap responses.
 */
export function addNotificationListeners(
  onNotificationReceived?: (notification: any) => void,
  onNotificationResponse?: (response: any) => void
): () => void {
  if (!Notifications) {
    return () => {};
  }

  const subs: any[] = [];

  if (onNotificationReceived) {
    const sub = Notifications.addNotificationReceivedListener(onNotificationReceived);
    subs.push(sub);
  }

  if (onNotificationResponse) {
    const sub = Notifications.addNotificationResponseReceivedListener(onNotificationResponse);
    subs.push(sub);
  }

  return () => {
    subs.forEach((sub) => {
      try {
        sub.remove();
      } catch {}
    });
  };
}

/**
 * Sends a local test notification to verify notification channels, sounds & banners.
 */
export async function sendTestLocalNotificationAsync(
  title = 'Nukaazo Store',
  body = '🎉 Test notification! Notifications are working properly.'
): Promise<void> {
  if (Platform.OS === 'web' || isExpoGo || !Notifications) {
    return;
  }

  try {
    await requestNotificationPermissionAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        channelId: 'promotions',
      },
      trigger: null, // deliver immediately
    });
  } catch (error) {
    console.warn('[NotificationService] Error scheduling local notification:', error);
  }
}
