import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    width: '100%',
    maxWidth: 340,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },

  ambientGlow: {
    position: 'absolute',
    top: -15,
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
  },

  iconArea: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  heroOuterCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  heroInnerCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },

  textSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 26,
    paddingHorizontal: 6,
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 20,
    lineHeight: 26,
    color: colors.textStrong,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  message: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14.5,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 22,
  },

  actionsContainer: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  singleButton: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  rowButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryGradient: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  primaryButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  cancelButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f4f4f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14.5,
    color: '#52525b',
  },
});

export default styles;
