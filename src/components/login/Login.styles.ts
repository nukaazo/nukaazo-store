import { colors } from '@/theme/colors';
import { Dimensions, StyleSheet, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export const isSmallDevice = width < 375 || height < 680;

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
    // Dynamic height provided via inline styles using useWindowDimensions()
    minHeight: 60,
  },

  /* ─── Top back button header ─── */
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 36,
    left: 18,
    zIndex: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
    paddingHorizontal: isSmallDevice ? 18 : 24,
    paddingTop: 10,
    backgroundColor: colors.background,
    paddingBottom: 0,
  },
  bottomSectionContent: {
    width: '100%',
  },

  /* Welcome Header */
  welcomeContainer: {
    marginBottom: isSmallDevice ? 10 : 14,
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: isSmallDevice ? 22 : 25,
    color: colors.textStrong,
    lineHeight: isSmallDevice ? 28 : 32,
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
    fontSize: isSmallDevice ? 11.5 : 12.5,
    color: colors.textDark,
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: isSmallDevice ? 46 : 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
    backgroundColor: '#ffffff',
  },
  inputWrapperError: {
    borderColor: '#ef4444', 
  },
  inputIcon: {
    marginRight: 8,
  },
  verticalSeparator: {
    width: 1,
    height: 18,
    backgroundColor: '#eaecef',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Nunito_400Regular',
    fontSize: isSmallDevice ? 14 : 15,
    color: colors.textStrong,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  errorText: {
    fontFamily: 'Nunito_400Regular',
    color: '#ef4444',
    fontSize: 11,
    marginTop: -6,
    marginBottom: 6,
    marginLeft: 4,
  },

  /* OTP Styles */
  otpSubtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: isSmallDevice ? 12.5 : 13.5,
    color: colors.textBody,
    marginBottom: 12,
    marginTop: -2,
  },
  otpInputWrapper: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    height: isSmallDevice ? 50 : 54,
  },
  otpTextInput: {
    textAlign: 'center',
    fontSize: isSmallDevice ? 19 : 22,
    letterSpacing: isSmallDevice ? 8 : 10,
    fontWeight: '600',
    color: colors.textStrong,
  },

  /* Details Form Layout Styles */
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 2,
  },
  fieldLabelText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: isSmallDevice ? 12.5 : 13.5,
    color: colors.textDark,
    marginLeft: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sideButton: {
    height: isSmallDevice ? 46 : 48,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: isSmallDevice ? 12 : 16,
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
    fontSize: isSmallDevice ? 13 : 14,
  },
  sideButtonCheck: {
    width: isSmallDevice ? 46 : 48,
    paddingHorizontal: 0,
  },

  /* ─── Submit CTA Buttons ─── */
  buttonWrapper: {
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  buttonWrapperDisabled: {
    opacity: 0.5,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    height: isSmallDevice ? 44 : 48,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: isSmallDevice ? 14.5 : 15,
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
    marginVertical: isSmallDevice ? 8 : 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderDefault,
  },
  dividerText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12.5,
    color: colors.textMuted,
    marginHorizontal: 10,
    textTransform: 'lowercase',
  },

  /* ─── Google Button ─── */
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: isSmallDevice ? 44 : 48,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  googleButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: isSmallDevice ? 14 : 15,
    color: colors.textStrong,
    marginLeft: 10,
  },

  /* Footer / Terms Links */
  footerContainer: {
    marginTop: isSmallDevice ? 14 : 18,
    paddingBottom: 12,
    alignItems: 'center',
  },
  termsText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: isSmallDevice ? 10.5 : 11.5,
    color: colors.textMutedDark,
    textAlign: 'center',
    lineHeight: isSmallDevice ? 14 : 16,
  },
  termsLink: {
    color: colors.primary,
    fontFamily: 'Nunito_700Bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: isSmallDevice ? 13 : 14,
    color: colors.textBody,
  },
  resendButton: {
    marginLeft: 4,
  },
  resendButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: isSmallDevice ? 13 : 14,
    color: colors.primary,
  },
  resendButtonTextDisabled: {
    color: colors.textMuted,
  },
});

export default styles;
