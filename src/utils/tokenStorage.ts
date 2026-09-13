import AsyncStorage from '@react-native-async-storage/async-storage';

let inMemoryToken: string | null = null;
const TOKEN_KEY = "access_token";

export const tokenStorage = {
  set(token: string): void {
    inMemoryToken = token;
    AsyncStorage.setItem(TOKEN_KEY, token).catch((err) => {
      console.error("Failed to store token in AsyncStorage", err);
    });
  },

  get(): string | null {
    return inMemoryToken;
  },

  remove(): void {
    inMemoryToken = null;
    AsyncStorage.removeItem(TOKEN_KEY).catch((err) => {
      console.error("Failed to remove token from AsyncStorage", err);
    });
  },

  async loadToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        inMemoryToken = token;
      }
      return token;
    } catch (e) {
      console.error("Failed to load token from AsyncStorage", e);
      return null;
    }
  }
};

export default tokenStorage;
