import { ENV } from '@/helper/env';

/**
 * Extracts the initials from a full name string.
 * Defaults to 'N' if no name is provided.
 */
export function getInitials(name?: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(' ');
    const validParts = parts.filter(part => part.length > 0);
    if (validParts.length > 0) {
      const initials = validParts.map(p => p[0]).join('').toUpperCase();
      return initials.slice(0, 2);
    }
  }
  return 'N';
}

/**
 * Resolves a full assets CDN URL from a relative S3 path key.
 * The base URL is read from EXPO_PUBLIC_ASSETS_BASE_URL via ENV.
 * Keeps absolute URLs (http/https) and local URIs (file/content) intact.
 */
export function getAssetsUrl(path?: string): string {
  if (!path || !path.trim()) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('file:') ||
    path.startsWith('content:')
  ) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${ENV.ASSETS_BASE_URL}/${cleanPath}`;
}
