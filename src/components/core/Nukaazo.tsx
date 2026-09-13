import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Link } from 'expo-router';
import NukaazoLogo from './NukaazoLogo';
import NukaazoText from './NukaazoText';

interface NukaazoProps {
  logoWidth?: number;
  logoHeight?: number;
  fontSize?: number;
  href?: string;
  style?: ViewStyle;
}

const Nukaazo = ({ logoWidth = 42, logoHeight = 42, fontSize = 24, href = "/", style }: NukaazoProps) => {
  const content = (
    <View style={[styles.container, style]}>
      <NukaazoLogo width={logoWidth} height={logoHeight} fill="#FCFCFA" />
      <NukaazoText fontSize={fontSize} style={styles.textSpacing} />
    </View>
  );

  if (href) {
    return (
      <Link href={href as any} asChild>
        <TouchableOpacity activeOpacity={0.8}>
          {content}
        </TouchableOpacity>
      </Link>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  textSpacing: {
    marginBottom: 4,
  }
});

export default Nukaazo;
