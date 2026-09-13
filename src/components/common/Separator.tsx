import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export default function Separator({
  orientation = 'horizontal',
  size = 1,
  color = '#eaecef',
  style,
}: SeparatorProps) {
  const isHorizontal = orientation === 'horizontal';

  const defaultStyle: ViewStyle = {
    backgroundColor: color,
    width: isHorizontal ? '100%' : size,
    height: isHorizontal ? size : '100%',
  };

  return <View style={[defaultStyle, style]} />;
}
