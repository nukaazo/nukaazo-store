import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

export default function DetailsSkeleton() {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Full Name Section */}
      <Animated.View style={[styles.labelSkeleton, { opacity: pulseAnim }]} />
      <View style={styles.row}>
        <Animated.View style={[styles.inputSkeleton, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.buttonSkeleton, { opacity: pulseAnim }]} />
      </View>

      {/* Email Section */}
      <Animated.View style={[styles.labelSkeleton, { opacity: pulseAnim }]} />
      <Animated.View style={[styles.fullInputSkeleton, { opacity: pulseAnim }]} />

      {/* Phone Number Section */}
      <Animated.View style={[styles.labelSkeleton, { opacity: pulseAnim }]} />
      <View style={styles.row}>
        <Animated.View style={[styles.inputSkeleton, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.buttonSkeleton, { opacity: pulseAnim }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width: '100%',
  },
  labelSkeleton: {
    width: 120,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#eaecef',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  inputSkeleton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#eaecef',
  },
  buttonSkeleton: {
    width: 80,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#eaecef',
    marginLeft: 10,
  },
  fullInputSkeleton: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#eaecef',
    marginBottom: 16,
  },
});
