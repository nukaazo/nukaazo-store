import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export type ModalType = 'error' | 'success' | 'info';
export type IoniconName = ComponentProps<typeof Ionicons>['name'];

export interface ModalTypeConfig {
  iconName: IoniconName;
  iconColor: string;
  bgColor: string;
  glowColor: string;
  outerRingColor: string;
  btnColors: readonly [string, string];
  badgeIcon: IoniconName;
  badgeBg: string;
}

export const typeConfigs: Record<ModalType, ModalTypeConfig> = {
  error: {
    iconName: 'alert-circle',
    iconColor: colors.primary,
    bgColor: '#fff5f0',
    glowColor: 'rgba(232, 92, 28, 0.16)',
    outerRingColor: 'rgba(232, 92, 28, 0.18)',
    btnColors: [colors.primary, colors.primaryHighlight] as const,
    badgeIcon: 'warning',
    badgeBg: colors.primary,
  },
  success: {
    iconName: 'checkmark-circle',
    iconColor: colors.secondary,
    bgColor: '#f0f9f9',
    glowColor: 'rgba(0, 99, 99, 0.16)',
    outerRingColor: 'rgba(0, 99, 99, 0.18)',
    btnColors: [colors.secondary, '#008080'] as const,
    badgeIcon: 'checkmark',
    badgeBg: colors.secondary,
  },
  info: {
    iconName: 'information-circle',
    iconColor: colors.privacyAccent,
    bgColor: '#f0f9ff',
    glowColor: 'rgba(2, 132, 199, 0.16)',
    outerRingColor: 'rgba(2, 132, 199, 0.18)',
    btnColors: [colors.privacyAccent, '#0284c7'] as const,
    badgeIcon: 'help',
    badgeBg: colors.privacyAccent,
  },
};

export function getModalConfig(type?: ModalType): ModalTypeConfig {
  if (!type || !typeConfigs[type]) {
    return typeConfigs.error;
  }
  return typeConfigs[type];
}

export default getModalConfig;
