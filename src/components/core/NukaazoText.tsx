import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface NukaazoTextProps {
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  style?: TextStyle;
}

export default function NukaazoText({
  fontSize = 24,
  fontWeight = 'bold',
  style,
}: NukaazoTextProps) {
  return (
    <Text
      style={[
        styles.container,
        { fontSize, fontWeight },
        style,
      ]}
    >
      <Text style={{ color: colors.primary }}>Nukaa</Text>
      <Text style={{ color: colors.secondary }}>zo</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Poppins_800ExtraBold',
    letterSpacing: -0.5,
  },
});
