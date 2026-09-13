import { useState } from 'react';
import { tokenStorage } from '@/utils/tokenStorage';

export function useIntroHandler() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const isCheckingAuth = false;
  const hasToken = !!tokenStorage.get();

  return {
    isSplashDone,
    setIsSplashDone,
    isCheckingAuth,
    hasToken,
  };
}

export default useIntroHandler;
