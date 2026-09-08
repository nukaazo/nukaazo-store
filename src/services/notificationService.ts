import { Platform } from 'react-native';
import Constants from 'expo-constants';

let Notifications: any = null;
const isExpoGo =
  Constants.executionEnvironment === 'storeClient' ||
  (Constants as any).appOwnership === 'expo';

// In Expo Go SDK 53+, remote notifications must not be initialized directly
if (!isExpoGo && Platform.OS !== 'web') {
  try {
    Notifications = require('expo-notifications');
  } catch (e) {
    console.warn('expo-notifications module could not be loaded:', e);
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
  } catch {}
}

export async function requestNotificationPermissionAsync(): Promise<boolean> {
  if (Platform.OS === 'web' || isExpoGo || !Notifications) {
    return false;
  }

  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#e85c1c',
      });

      await Notifications.setNotificationChannelAsync('promotions', {
        name: 'Offers & Updates',
        importance: Notifications.AndroidImportance.HIGH,
        lightColor: '#e85c1c',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.warn('Error requesting notification permission:', error);
    return false;
  }
}

/**
 * Retrieves the device's Expo Push Token for sending remote push notifications.
 */
export async function getExpoPushTokenAsync(): Promise<string | null> {
  if (Platform.OS === 'web' || isExpoGo || !Notifications) {
    return null;
  }

  try {
    const isGranted = await requestNotificationPermissionAsync();
    if (!isGranted) return null;

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    const tokenData = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );
    console.log('📱 Expo Push Token:', tokenData.data);
    return tokenData.data;
  } catch (error) {
    console.warn('Error fetching push token:', error);
    return null;
  }
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
    console.warn('Error scheduling local notification:', error);
  }
}
