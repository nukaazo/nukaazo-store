import React from 'react';
import Svg, { Rect, G, Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface NukaazoLogoProps {
  width?: number;
  height?: number;
  fill?: string;
}

export default function NukaazoLogo({
  width = 42,
  height = 42,
  fill = '#FFFFFF',
}: NukaazoLogoProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512">
      <Rect x="56" y="56" width="400" height="400" rx="90" fill={fill} />
      <G x="156" y="132">
        <Path
          d="M30 40 C 30 -20, 170 -20, 170 40"
          stroke={colors.secondary}
          strokeWidth="32"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M30 95 V 260 M30 95 L 170 260 M170 95 V 260"
          stroke={colors.primary}
          strokeWidth="55"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}
