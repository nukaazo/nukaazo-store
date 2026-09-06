import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconOuterRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.orangeTint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  iconInnerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headline: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: colors.textStrong,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
    color: colors.textBody,
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
    color: colors.textMutedDark,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 24,
  },
  errorBoxText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 12,
    color: '#991b1b',
    textAlign: 'center',
  },
  retryButtonWrapper: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  retryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 10,
  },
  retryButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
  retryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});

export default function Ignore() {
  return null;
}
