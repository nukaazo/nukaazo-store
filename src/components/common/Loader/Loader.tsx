import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { colors } from '@/theme/colors';
import NukaazoLogo from '../../core/NukaazoLogo';
import NukaazoText from '../../core/NukaazoText';
import { styles } from './Loader.styles';

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

    const anim1 = animateOpacity(opacity1, 0);
    const anim2 = animateOpacity(opacity2, 200);
    const anim3 = animateOpacity(opacity3, 400);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [opacity1, opacity2, opacity3]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <NukaazoLogo width={120} height={120} fill="#FFFFFF" />
        <NukaazoText fontSize={28} fontWeight="800" style={styles.brandText} />

        <View style={styles.dotsContainer}>
          <Animated.View
            style={[
              styles.dot,
              { opacity: opacity1, backgroundColor: colors.primary },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              { opacity: opacity2, backgroundColor: colors.secondary },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              { opacity: opacity3, backgroundColor: colors.primary },
            ]}
          />
        </View>
      </View>
    </View>
  );
}
