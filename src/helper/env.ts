const ensureEnv = (name: string, value: string | undefined): string => {
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
};

export const ENV = {
  get BACKEND_BASE_URL() {
    return ensureEnv("EXPO_PUBLIC_BACKEND_BASE_URL", process.env.EXPO_PUBLIC_BACKEND_BASE_URL);
  },
  get ASSETS_BASE_URL() {
    return ensureEnv("EXPO_PUBLIC_ASSETS_BASE_URL", process.env.EXPO_PUBLIC_ASSETS_BASE_URL);
  },
  get GOOGLE_WEB_CLIENT_ID() {
    return process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '192594242477-gbhgj2ne7njdqhk634k421rphrmeugqv.apps.googleusercontent.com';
  }
};

export default ENV;
