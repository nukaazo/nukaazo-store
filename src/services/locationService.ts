import { Platform } from 'react-native';
import * as Location from 'expo-location';

/**
 * Checks if foreground location permission is granted, and requests it if not.
 * Returns true if permission is granted, false otherwise.
 */
export async function requestLocationPermissionAsync(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return false;
  }

  try {
    const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.warn('Error requesting location permission:', error);
    return false;
  }
}

/**
 * Checks current location permission status without prompting.
 */
export async function checkLocationPermissionAsync(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return false;
  }

  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.warn('Error checking location permission:', error);
    return false;
  }
}
