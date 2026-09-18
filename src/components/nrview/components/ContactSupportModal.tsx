import React from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { styles } from '../styles/nrview.styles';
import { emptyStoreProfileContent } from '../content/emptyStoreProfile.content';

interface ContactSupportModalProps {
  visible: boolean;
  onClose: () => void;
  onWhatsApp: () => void;
  onCall: () => void;
  onEmail: () => void;
}

export default function ContactSupportModal({
  visible,
  onClose,
  onWhatsApp,
  onCall,
  onEmail,
}: ContactSupportModalProps) {
  const { supportModal } = emptyStoreProfileContent;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView intensity={25} tint="dark" style={{ ...Platform.select({ ios: { flex: 1 }, default: {} }) }} />

        <View style={styles.modalSheet}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>{supportModal.title}</Text>
              <Text style={styles.modalSubtitle}>{supportModal.subtitle}</Text>
            </View>
            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Ionicons name="close" size={20} color={colors.textStrong} />
            </Pressable>
          </View>

          {/* Option 1: WhatsApp Support */}
          <Pressable
            onPress={onWhatsApp}
            style={({ pressed }) => [styles.contactOptionRow, pressed && styles.contactOptionPressed]}
          >
            <View style={[styles.contactIconBox, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="logo-whatsapp" size={22} color="#16a34a" />
            </View>
            <View style={styles.contactOptionContent}>
              <Text style={styles.contactOptionTitle}>WhatsApp Chat</Text>
              <Text style={styles.contactOptionSubtitle}>Instant onboarding help • Quick response</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMutedDark} />
          </Pressable>

          {/* Option 2: Call Merchant Desk */}
          <Pressable
            onPress={onCall}
            style={({ pressed }) => [styles.contactOptionRow, pressed && styles.contactOptionPressed]}
          >
            <View style={[styles.contactIconBox, { backgroundColor: colors.orangeTint }]}>
              <Ionicons name="call" size={20} color={colors.primary} />
            </View>
            <View style={styles.contactOptionContent}>
              <Text style={styles.contactOptionTitle}>Direct Phone Call</Text>
              <Text style={styles.contactOptionSubtitle}>{supportModal.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMutedDark} />
          </Pressable>

          {/* Option 3: Email Support */}
          <Pressable
            onPress={onEmail}
            style={({ pressed }) => [styles.contactOptionRow, pressed && styles.contactOptionPressed]}
          >
            <View style={[styles.contactIconBox, { backgroundColor: colors.tealTint }]}>
              <Ionicons name="mail" size={20} color={colors.secondary} />
            </View>
            <View style={styles.contactOptionContent}>
              <Text style={styles.contactOptionTitle}>Email Support</Text>
              <Text style={styles.contactOptionSubtitle}>{supportModal.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMutedDark} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
