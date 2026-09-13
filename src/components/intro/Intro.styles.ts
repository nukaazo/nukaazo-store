import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../theme/colors";

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 380 || height < 700;

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

  /* ─── Bottom content area ─── */
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingHorizontal: isSmallDevice ? 20 : 28,
    paddingTop: 8,
    backgroundColor: colors.background,
  },

  /* Title text */
  textContainer: {
    marginBottom: isSmallDevice ? 12 : 18,
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: isSmallDevice ? 25 : 32,
    color: colors.textStrong,
    lineHeight: isSmallDevice ? 32 : 40,
    letterSpacing: -0.5,
  },
  primaryText: {
    color: colors.primary,
  },
  description: {
    fontSize: isSmallDevice ? 13.5 : 15,
    color: colors.textBody,
    marginTop: isSmallDevice ? 6 : 10,
    lineHeight: isSmallDevice ? 19 : 22,
    letterSpacing: 0.1,
    fontFamily: 'Nunito_400Regular',
  },

  /* ─── Flat CTA Button ─── */
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 6,
  },
  button: {
    borderRadius: 12,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isSmallDevice ? 13 : 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: isSmallDevice ? 15.5 : 17,
    fontFamily: 'Nunito_700Bold',
    letterSpacing: 0.5,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: -4,
  },

  /* ─── Flat Footer ─── */
  footerContainer: {
    alignItems: 'center',
    marginTop: isSmallDevice ? 12 : 18,
  },
  footerText: {
    fontSize: isSmallDevice ? 10.5 : 11.5,
    color: colors.textMutedDark,
    letterSpacing: 0.3,
    fontFamily: 'Nunito_600SemiBold',
  },
});

export default styles;
