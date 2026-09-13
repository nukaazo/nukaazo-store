import React from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { customModalContent } from './content/customModal.content';
import { getModalConfig, ModalType } from './helpers/customModal.helper';
import { styles } from './CustomModal.styles';

export interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: ModalType;
  buttonText?: string;
  showCancel?: boolean;
  cancelText?: string;
  onConfirm?: () => void;
}

export default function CustomModal({
  visible,
  onClose,
  title,
  message,
  type = 'error',
  buttonText = customModalContent.defaultButtonText,
  showCancel = false,
  cancelText = customModalContent.defaultCancelText,
  onConfirm,
}: CustomModalProps) {
  const config = getModalConfig(type);
  const displayTitle = title || customModalContent.defaultTitles[type || 'error'];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.backdrop}>
        <BlurView
          intensity={45}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.card}>
          <View
            style={[
              styles.ambientGlow,
              { backgroundColor: config.glowColor },
            ]}
          />

          <View style={styles.iconArea}>
            <View
              style={[
                styles.heroOuterCircle,
                {
                  backgroundColor: config.bgColor,
                  borderColor: config.outerRingColor,
                },
              ]}
            >
              <View style={[styles.heroInnerCircle, { backgroundColor: config.bgColor }]}>
                <Ionicons name={config.iconName} size={28} color={config.iconColor} />
              </View>
            </View>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.title}>{displayTitle}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.actionsContainer}>
            {showCancel ? (
              <View style={styles.buttonRow}>
                <Pressable
                  style={({ pressed }) => [
                    styles.rowButton,
                    styles.cancelButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={onClose}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.rowButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={onConfirm || onClose}
                >
                  <LinearGradient
                    colors={config.btnColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.primaryGradient}
                  >
                    <Text style={styles.primaryButtonText}>{buttonText}</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.singleButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={onClose}
              >
                <LinearGradient
                  colors={config.btnColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryGradient}
                >
                  <Text style={styles.primaryButtonText}>{buttonText}</Text>
                </LinearGradient>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
