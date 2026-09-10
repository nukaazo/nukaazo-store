import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { APP_CONFIG } from '@/config';

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
}

export const DEFAULT_COORDINATES: [number, number] =
  APP_CONFIG.location?.defaultCoordinates || [18.7067776, 73.6582349];

/**
 * Checks if foreground location permission is granted, and requests it if not.
 * Returns true if permission is granted, false otherwise.
 */
export async function requestLocationPermissionAsync(): Promise<boolean> {
  if (Platform.OS === 'web' || !APP_CONFIG.location.enabled) {
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
    console.warn('[LocationService] Error requesting location permission:', error);
    return false;
  }
}

/**
 * Checks current location permission status without prompting.
 */
export async function checkLocationPermissionAsync(): Promise<boolean> {
  if (Platform.OS === 'web' || !APP_CONFIG.location.enabled) {
    return false;
  }

  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.warn('[LocationService] Error checking location permission:', error);
    return false;
  }
}

/**
 * Gets the current device location and reverse-geocodes it into a formatted LocationData object.
 */
export async function getCurrentLocationDataAsync(): Promise<LocationData | null> {
  if (Platform.OS === 'web' || !APP_CONFIG.location.enabled) {
    return null;
  }

  try {
    const isGranted = await requestLocationPermissionAsync();
    if (!isGranted) {
      console.warn('[LocationService] Location permission not granted');
      return null;
    }

    const accuracy = APP_CONFIG.location.enableHighAccuracy
      ? Location.Accuracy.High
      : Location.Accuracy.Balanced;

    const position = await Location.getCurrentPositionAsync({ accuracy });

    const { latitude, longitude } = position.coords;

    let address = 'Current Location';
    let city: string | undefined;
    let state: string | undefined;
    let country: string | undefined;
    let postcode: string | undefined;

    const reverseGeoConfig = APP_CONFIG.location.reverseGeocoding;

    if (reverseGeoConfig?.enabled) {
      // 1. Try Expo reverse geocoding if provider is 'expo' or 'both'
      if (reverseGeoConfig.provider === 'expo' || reverseGeoConfig.provider === 'both') {
        try {
          const geocodeResult = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

          if (geocodeResult && geocodeResult.length > 0) {
            const item = geocodeResult[0];
            const addressParts = [
              item.name,
              item.street,
              item.district,
              item.city || item.subregion,
              item.region,
              item.postalCode,
            ].filter(Boolean);

            address = addressParts.length > 0 ? addressParts.join(', ') : 'Current Location';
            city = item.city || item.subregion || undefined;
            state = item.region || undefined;
            country = item.country || undefined;
            postcode = item.postalCode || undefined;
          }
        } catch (geoError) {
          console.warn('[LocationService] Expo reverse geocode failed:', geoError);
        }
      }

      // 2. Try Nominatim fallback if address is still generic and provider is 'nominatim' or 'both'
      if (
        (reverseGeoConfig.provider === 'nominatim' ||
          (reverseGeoConfig.provider === 'both' && address === 'Current Location'))
      ) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          if (response.ok) {
            const data = await response.json();
            address = data.display_name || 'Current Location';
            city = data.address?.city || data.address?.town || data.address?.village;
            state = data.address?.state;
            country = data.address?.country;
            postcode = data.address?.postcode;
          }
        } catch (fallbackError) {
          console.warn('[LocationService] Nominatim fallback reverse geocoding failed:', fallbackError);
        }
      }
    }

    const locationData: LocationData = {
      latitude,
      longitude,
      address,
      city,
      state,
      country,
      postcode,
    };

    return locationData;
  } catch (error) {
    console.warn('[LocationService] Failed to get device location:', error);
    return null;
  }
}

