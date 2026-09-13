import { colors } from '@/theme/colors';
import { StyleSheet, Platform } from 'react-native';
import { responsiveFontSize, moderateScale, scale, verticalScale, SCREEN } from '@/utils/responsive';

export const styles = StyleSheet.create({
  /* ─── Main container ─── */
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* ─── Full-screen 100% Background Image ─── */
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  /* ─── Layout wrappers ─── */
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  heroSpacer: {
    minHeight: verticalScale(40),
  },

  /* ─── Top back button header ─── */
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 36,
    left: 18,
    zIndex: 10,
  },
  backButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    shadowColor: '#18181b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  /* ─── Torn Paper Separator Wrapper ─── */
  tornPaperWrapper: {
    width: '100%',
    height: 32,
    position: 'relative',
    backgroundColor: 'transparent',
    marginBottom: -1,
  },
  tornShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 32,
  },
  tornFiber: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 32,
  },
  tornMain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 32,
  },

  /* ─── Bottom Content Sheet ─── */
  contentContainer: {
    paddingHorizontal: SCREEN.isSmallDevice ? scale(18) : scale(24),
    paddingTop: verticalScale(10),
    backgroundColor: colors.background,
    paddingBottom: 0,
  },
  bottomSectionContent: {
    width: '100%',
  },

  /* Welcome Header */
  welcomeContainer: {
    marginBottom: SCREEN.isSmallDevice ? verticalScale(10) : verticalScale(14),
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: responsiveFontSize(24),
    color: colors.textStrong,
    lineHeight: responsiveFontSize(30),
    letterSpacing: -0.4,
  },
  subtitle: {
    display: 'none',
  },

  /* ─── Form Inputs ─── */
  formContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  inputLabel: {
    fontFamily: 'Nunito_700Bold',
    fontSize: responsiveFontSize(12.5),
    color: colors.textDark,
    marginBottom: verticalScale(5),
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SCREEN.isSmallDevice ? verticalScale(44) : verticalScale(48),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: '#ffffff',
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(10),
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
    backgroundColor: '#ffffff',
  },
  inputWrapperError: {
    borderColor: '#ef4444', 
  },
  inputIcon: {
    marginRight: scale(8),
  },
  verticalSeparator: {
    width: 1,
    height: verticalScale(18),
    backgroundColor: '#eaecef',
    marginRight: scale(10),
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Nunito_400Regular',
    fontSize: responsiveFontSize(14.5),
    color: colors.textStrong,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  errorText: {
    fontFamily: 'Nunito_400Regular',
    color: '#ef4444',
    fontSize: responsiveFontSize(11),
    marginTop: -verticalScale(6),
    marginBottom: verticalScale(6),
    marginLeft: 4,
  },

  /* OTP Styles */
  otpSubtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: responsiveFontSize(13),
    color: colors.textBody,
    marginBottom: verticalScale(12),
    marginTop: -verticalScale(2),
  },
  otpInputWrapper: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    height: SCREEN.isSmallDevice ? verticalScale(50) : verticalScale(54),
  },
  otpTextInput: {
    textAlign: 'center',
    fontSize: responsiveFontSize(20),
    letterSpacing: SCREEN.isSmallDevice ? 8 : 10,
    fontWeight: '600',
    color: colors.textStrong,
  },

  /* Details Form Layout Styles */
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
    marginLeft: 2,
  },
  fieldLabelText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: responsiveFontSize(13),
    color: colors.textDark,
    marginLeft: scale(6),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  sideButton: {
    height: SCREEN.isSmallDevice ? verticalScale(44) : verticalScale(48),
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
    paddingHorizontal: scale(14),
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  sideButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sideButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: colors.textStrong,
    fontSize: responsiveFontSize(13.5),
  },
  sideButtonCheck: {
    width: SCREEN.isSmallDevice ? verticalScale(44) : verticalScale(48),
    paddingHorizontal: 0,
  },

  /* ─── Submit CTA Buttons ─── */
  buttonWrapper: {
    borderRadius: 10,
    marginTop: verticalScale(10),
    overflow: 'hidden',
  },
  buttonWrapperDisabled: {
    opacity: 0.5,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    height: SCREEN.isSmallDevice ? verticalScale(44) : verticalScale(48),
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: responsiveFontSize(15),
    fontFamily: 'Nunito_700Bold',
    letterSpacing: 0.4,
  },
  buttonDisabled: {
    backgroundColor: colors.borderDefault,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextDisabled: {
    color: colors.textMuted,
  },

  /* Divider (OR) */
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SCREEN.isSmallDevice ? verticalScale(8) : verticalScale(10),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderDefault,
  },
  dividerText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: responsiveFontSize(12),
    color: colors.textMuted,
    marginHorizontal: scale(10),
    textTransform: 'lowercase',
  },

  /* ─── Google Button ─── */
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN.isSmallDevice ? verticalScale(44) : verticalScale(48),
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  googleButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: responsiveFontSize(14.5),
    color: colors.textStrong,
    marginLeft: scale(10),
  },

  /* Footer / Terms Links */
  footerContainer: {
    marginTop: SCREEN.isSmallDevice ? verticalScale(12) : verticalScale(16),
    paddingBottom: verticalScale(12),
    alignItems: 'center',
  },
  termsText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: responsiveFontSize(11),
    color: colors.textMutedDark,
    textAlign: 'center',
    lineHeight: responsiveFontSize(15),
  },
  termsLink: {
    color: colors.primary,
    fontFamily: 'Nunito_700Bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  resendText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: responsiveFontSize(13.5),
    color: colors.textBody,
  },
  resendButton: {
    marginLeft: 4,
  },
  resendButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: responsiveFontSize(13.5),
    color: colors.primary,
  },
  resendButtonTextDisabled: {
    color: colors.textMuted,
  },
});

export default styles;
