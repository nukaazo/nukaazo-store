import { useRouter } from 'expo-router';

export function usePrivacyHandler() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return {
    handleBack,
  };
}

export default usePrivacyHandler;
