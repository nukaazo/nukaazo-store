import { useRouter } from 'expo-router';

export function useTermsHandler() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return {
    handleBack,
  };
}

export default useTermsHandler;
