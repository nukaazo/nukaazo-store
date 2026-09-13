import { TextStyle } from 'react-native';
import { responsiveFontSize } from '@/utils/responsive';

export const fontFamilies = {
  nunito: {
    regular: 'Nunito_400Regular',
    semiBold: 'Nunito_600SemiBold',
    bold: 'Nunito_700Bold',
    extraBold: 'Nunito_800ExtraBold',
  },
  poppins: {
    regular: 'Poppins_400Regular',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
    extraBold: 'Poppins_800ExtraBold',
  },
} as const;

export const typography = {
  // Headings
  h1: {
    fontFamily: fontFamilies.poppins.bold,
    fontSize: responsiveFontSize(28),
    lineHeight: responsiveFontSize(34),
  } as TextStyle,

  h2: {
    fontFamily: fontFamilies.poppins.bold,
    fontSize: responsiveFontSize(22),
    lineHeight: responsiveFontSize(28),
  } as TextStyle,

  h3: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveFontSize(24),
  } as TextStyle,

  h4: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(22),
  } as TextStyle,

  // Body text
  bodyLarge: {
    fontFamily: fontFamilies.nunito.regular,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(22),
  } as TextStyle,

  body: {
    fontFamily: fontFamilies.nunito.regular,
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
  } as TextStyle,

  bodySmall: {
    fontFamily: fontFamilies.nunito.regular,
    fontSize: responsiveFontSize(12),
    lineHeight: responsiveFontSize(16),
  } as TextStyle,

  // Captions & Badges
  caption: {
    fontFamily: fontFamilies.nunito.semiBold,
    fontSize: responsiveFontSize(11),
    lineHeight: responsiveFontSize(14),
  } as TextStyle,

  button: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: responsiveFontSize(15),
    lineHeight: responsiveFontSize(20),
  } as TextStyle,
};

export default typography;
