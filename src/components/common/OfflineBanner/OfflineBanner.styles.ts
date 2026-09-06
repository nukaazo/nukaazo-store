import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b91c1c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 100,
  },
  text: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 13,
    color: '#ffffff',
  },
});

export default function Ignore() {
  return null;
}
