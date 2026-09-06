import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    marginTop: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    width: 72,
    justifyContent: 'space-between',
    marginTop: 24,
    height: 20,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default function Ignore() {
  return null;
}
