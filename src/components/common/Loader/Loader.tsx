import { colors } from '@/theme/colors';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import NukaazoLogo from '../../core/NukaazoLogo';
import NukaazoText from '../../core/NukaazoText';

export default function Loader() {
  const opacity1 = useRef(new Animated.Value(0.2)).current;
  const opacity2 = useRef(new Animated.Value(0.2)).current;
  const opacity3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const animateOpacity = (value: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1.0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(300),
        ])
      );
    };

    Animated.parallel([
      animateOpacity(opacity1, 0),
      animateOpacity(opacity2, 200),
      animateOpacity(opacity3, 400),
    ]).start();
  }, [opacity1, opacity2, opacity3]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <NukaazoLogo width={150} height={150} fill="transparent" />
        <NukaazoText fontSize={36} fontWeight="800" style={styles.brandText} />
        
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { opacity: opacity1 }, { backgroundColor: colors.primary }]} />
          <Animated.View style={[styles.dot, { opacity: opacity2 }, { backgroundColor: colors.secondary }]} />
          <Animated.View style={[styles.dot, { opacity: opacity3 }, { backgroundColor: colors.primary }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 80,
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
