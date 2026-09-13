import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline base dimensions based on standard mobile viewport (iPhone X/11/12/13/14 base)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scale horizontally based on screen width.
 */
export const scale = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Scale vertically based on screen height.
 */
export const verticalScale = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Moderately scale a value with an optional resize factor (default: 0.5).
 * Prevents extreme scaling on very small or very large devices.
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Responsive font sizing that calculates scaled font size based on screen width,
 * dampening extreme system font scaling (PixelRatio.getFontScale()) so that
 * fonts never blow up or appear disproportionately large on smaller screens.
 */
export const responsiveFontSize = (size: number, factor = 0.3): number => {
  const fontScale = PixelRatio.getFontScale();
  const scaled = moderateScale(size, factor);
  // If user has system accessibility font size bumped high (> 1.15), clamp the multiplier
  // to preserve UI card padding and prevent text overflow on compact screens
  const normalized = fontScale > 1.15 ? scaled / (fontScale / 1.15) : scaled;
  return Math.round(PixelRatio.roundToNearestPixel(normalized));
};

export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375,
  isTablet: SCREEN_WIDTH >= 768,
};

export default {
  scale,
  verticalScale,
  moderateScale,
  responsiveFontSize,
  SCREEN,
};
