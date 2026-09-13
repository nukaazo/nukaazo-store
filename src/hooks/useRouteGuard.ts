import { useEffect } from 'react';
import { useRouter, useSegments, usePathname } from 'expo-router';
import { tokenStorage } from '@/utils/tokenStorage';
import { useProfile } from '@/context/ProfileContext';
import { ROUTES, isExemptRoute } from '@/helper/routes';

export function useRouteGuard(isTokenLoaded: boolean) {
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();
  const { profile, isLoading } = useProfile();

  useEffect(() => {
    if (!isTokenLoaded) return;

    const token = tokenStorage.get();
    const isAuthRoute = (segments[0] as string) === 'ui';
    const exempt = isExemptRoute(pathname);

    if (token) {
      if (!profile) {
        return;
      }

      const hasCompletedProfile = !!profile?.name && !!profile?.phone;

      if (hasCompletedProfile) {
        if (!isAuthRoute) {
          router.replace(ROUTES.DASHBOARD);
        }
      } else {
        if (pathname !== ROUTES.LOGIN && !exempt) {
          router.replace(ROUTES.LOGIN);
        }
      }
    } else {
      if (isAuthRoute && !exempt) {
        router.replace(ROUTES.ROOT);
      }
    }
  }, [pathname, isTokenLoaded, segments, router, profile, isLoading]);
}

export default useRouteGuard;
