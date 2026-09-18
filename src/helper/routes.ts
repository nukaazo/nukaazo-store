export const ROUTES = {
  ROOT: '/' as any,
  LOGIN: '/login' as any,
  DASHBOARD: '/ui/dashboard' as any,
  CREATE_SHOP: '/ui/create-shop' as any,
  TERMS: '/ui/terms' as any,
  PRIVACY: '/ui/privacy' as any,
} as const;

export const EXEMPT_ROUTES = [
  ROUTES.TERMS,
  ROUTES.PRIVACY,
] as const;

export const isExemptRoute = (pathname?: string | null): boolean => {
  if (!pathname) return false;
  return EXEMPT_ROUTES.some((route) => pathname === route);
};

export default ROUTES;
