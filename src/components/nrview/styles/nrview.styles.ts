import { colors } from '@/theme/colors';
import { responsiveFontSize } from '@/utils/responsive';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 24 : 32,
    paddingBottom: Platform.OS === 'ios' ? 28 : 24,
  },

  // ─── Top Spacer / Section ───
  topSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  // ─── Hero Illustration & Stage ───
  heroSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 295,
    marginTop: 4,
    marginBottom: 0,
  },
  stageRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.orangeTint,
    borderWidth: 1,
    borderColor: 'rgba(232, 92, 28, 0.12)',
    zIndex: 0,
  },
  stageRingPulse: {
    position: 'absolute',
    width: 290,
    height: 290,
    borderRadius: 145,
    backgroundColor: 'rgba(232, 92, 28, 0.04)',
    zIndex: -1,
  },
  imageWrapper: {
    width: 230,
    height: 285,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
  },
  shopkeeperImage: {
    width: '100%',
    height: '100%',
  },

  // ─── Handwritten Annotations Positioned to the Right of the Phone ───
  // Extends outside the body so text never overlaps his arm/chest
  handwrittenContainer: {
    position: 'absolute',
    right: -80,
    bottom: 126,
    zIndex: 4,
    alignItems: 'flex-start',
  },
  handwrittenLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  handwrittenCheck: {
    marginRight: 1,
  },
  handwrittenText: {
    fontFamily: 'Kalam_700Bold',
    fontSize: responsiveFontSize(14),
    color: '#0d9488', // vibrant teal marker
    letterSpacing: 0.2,
  },
  handwrittenSubText: {
    fontFamily: 'Kalam_700Bold',
    fontSize: responsiveFontSize(12.5),
    color: '#0d9488',
    letterSpacing: 0.2,
  },
  phoneConnectingArrow: {
    position: 'absolute',
    left: -22,
    top: 4,
    zIndex: 3,
  },

  // ─── Balanced Typography & Content Section ───
  contentSection: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  welcomeTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: responsiveFontSize(22),
    lineHeight: responsiveFontSize(28),
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  statementText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: responsiveFontSize(14.5),
    lineHeight: responsiveFontSize(20),
    color: colors.textStrong,
    textAlign: 'center',
    marginBottom: 6,
    paddingHorizontal: 16,
  },
  descriptionText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: responsiveFontSize(12.5),
    lineHeight: responsiveFontSize(18),
    color: colors.textBody,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // ─── Bottom Action Area (Shadowless Button) ───
  actionSection: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    // Shadow completely removed as requested
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 8,
  },
  primaryButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: responsiveFontSize(15),
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  arrowIcon: {
    marginLeft: 2,
  },

  // ─── Perfectly Aligned Secondary Row: Contact Support & Sign Out ───
  secondaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 2,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  secondaryButtonPressed: {
    opacity: 0.65,
  },
  secondaryButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: responsiveFontSize(12.5),
    color: colors.primary,
  },
  secondaryDivider: {
    width: 1,
    height: 14,
    backgroundColor: colors.borderSubtle,
  },

  // ─── Contact Support Modal Sheet ───
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: responsiveFontSize(18),
    color: colors.textStrong,
  },
  modalSubtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: responsiveFontSize(12.5),
    color: colors.textMutedDark,
  },
  closeButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: colors.borderDivider,
  },
  contactOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: colors.borderDivider,
    marginBottom: 10,
    gap: 12,
  },
  contactOptionPressed: {
    backgroundColor: colors.orangeTint,
    borderColor: 'rgba(232, 92, 28, 0.3)',
  },
  contactIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactOptionContent: {
    flex: 1,
  },
  contactOptionTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: responsiveFontSize(14),
    color: colors.textStrong,
  },
  contactOptionSubtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: responsiveFontSize(11.5),
    color: colors.textMutedDark,
  },
});

export default styles;
