import { useState } from 'react';

export function useIntroHandler() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  return {
    isSplashDone,
    setIsSplashDone,
  };
}
