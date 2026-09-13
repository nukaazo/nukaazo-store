import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  // Custom Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#f1eee6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 4,
    borderRadius: 8,
  },
  headerTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.textStrong,
  },

  // Hero banner — teal theme for trust/privacy
  heroBanner: {
    backgroundColor: colors.tealTint,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#d0ecec',
    alignItems: 'center',
  },
  heroIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    color: '#3f7272',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Last updated chip
  updatedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: colors.tealTint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  updatedChipText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 11,
    color: colors.secondary,
  },

  // Intro card
  introCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    marginBottom: 16,
    gap: 6,
  },
  introText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 20,
  },
  consentNoteText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    color: colors.textMutedDark,
    lineHeight: 18,
    marginTop: 4,
    fontStyle: 'italic',
  },

  // Section card
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    marginBottom: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  sectionNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  sectionNumberText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 12,
    color: colors.surface,
  },
  sectionTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 14,
    color: colors.textStrong,
    flex: 1,
  },
  sectionBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 0,
  },
  sectionBodyText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 20,
    marginBottom: 10,
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.borderDivider,
    marginHorizontal: 14,
    marginBottom: 12,
  },

  // Subsection header
  subsectionBlock: {
    marginBottom: 12,
  },
  subsectionTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subsectionBody: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 20,
    marginBottom: 6,
  },

  // Bullet items
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
    marginTop: 7,
    flexShrink: 0,
  },
  bulletTextGroup: {
    flex: 1,
  },
  bulletLabel: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 13,
    color: colors.textDark,
  },
  bulletText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 18,
    marginTop: 2,
  },

  // Grievance Officer card
  grievanceCard: {
    backgroundColor: '#f8fbfb',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d0ecec',
    marginTop: 8,
    gap: 6,
  },
  grievanceCardTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 4,
  },
  grievanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  grievanceLabel: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 12,
    color: colors.textStrong,
    width: 52,
    flexShrink: 0,
  },
  grievanceValue: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    color: colors.textBody,
    flex: 1,
    lineHeight: 18,
  },
  grievanceEmail: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 12,
    color: colors.secondary,
    flex: 1,
    lineHeight: 18,
  },

  // Footer
  footerCard: {
    backgroundColor: colors.tealTint,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#d0ecec',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 8,
  },
  footerText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    color: '#3f7272',
    lineHeight: 18,
    flex: 1,
  },
});
