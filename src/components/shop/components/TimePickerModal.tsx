import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

interface TimePickerModalProps {
  visible: boolean;
  title?: string;
  initialTime?: string; // "HH:mm"
  onClose: () => void;
  onConfirm: (time: string) => void;
}

const COMMON_PRESETS = [
  "08:00", "09:00", "10:00", "12:00", "14:00", "18:00", "20:00", "21:00", "22:00", "23:00"
];

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  title = "Select Time",
  initialTime = "09:00",
  onClose,
  onConfirm,
}) => {
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");

  React.useEffect(() => {
    if (visible && initialTime) {
      const parts = initialTime.split(":");
      setSelectedHour(parts[0] || "09");
      setSelectedMinute(parts[1] || "00");
    }
  }, [visible, initialTime]);

  const handlePresetSelect = (timeStr: string) => {
    const parts = timeStr.split(":");
    setSelectedHour(parts[0]);
    setSelectedMinute(parts[1]);
  };

  const handleConfirm = () => {
    onConfirm(`${selectedHour}:${selectedMinute}`);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={pickerStyles.overlay}>
        <Pressable style={pickerStyles.backdrop} onPress={onClose} />
        <View style={pickerStyles.dialog}>
          {/* Header */}
          <View style={pickerStyles.header}>
            <View>
              <Text style={pickerStyles.title}>{title}</Text>
              <Text style={pickerStyles.currentTimeDisplay}>
                {selectedHour}:{selectedMinute}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={pickerStyles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          {/* Quick Presets */}
          <Text style={pickerStyles.subheading}>Popular Hours</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={pickerStyles.presetsRow}>
            {COMMON_PRESETS.map((preset) => {
              const isActive = `${selectedHour}:${selectedMinute}` === preset;
              return (
                <TouchableOpacity
                  key={preset}
                  onPress={() => handlePresetSelect(preset)}
                  style={[pickerStyles.presetPill, isActive && pickerStyles.presetPillActive]}
                >
                  <Text style={[pickerStyles.presetText, isActive && pickerStyles.presetTextActive]}>
                    {preset}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Selectors Column */}
          <View style={pickerStyles.columnsRow}>
            {/* Hour Column */}
            <View style={pickerStyles.col}>
              <Text style={pickerStyles.colHeader}>Hour (24h)</Text>
              <ScrollView style={pickerStyles.colScroll} showsVerticalScrollIndicator={false}>
                {HOURS.map((h) => {
                  const isSel = selectedHour === h;
                  return (
                    <TouchableOpacity
                      key={h}
                      onPress={() => setSelectedHour(h)}
                      style={[pickerStyles.itemButton, isSel && pickerStyles.itemButtonSelected]}
                    >
                      <Text style={[pickerStyles.itemText, isSel && pickerStyles.itemTextSelected]}>
                        {h}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Separator */}
            <View style={pickerStyles.colonWrapper}>
              <Text style={pickerStyles.colon}>:</Text>
            </View>

            {/* Minute Column */}
            <View style={pickerStyles.col}>
              <Text style={pickerStyles.colHeader}>Minute</Text>
              <ScrollView style={pickerStyles.colScroll} showsVerticalScrollIndicator={false}>
                {MINUTES.map((m) => {
                  const isSel = selectedMinute === m;
                  return (
                    <TouchableOpacity
                      key={m}
                      onPress={() => setSelectedMinute(m)}
                      style={[pickerStyles.itemButton, isSel && pickerStyles.itemButtonSelected]}
                    >
                      <Text style={[pickerStyles.itemText, isSel && pickerStyles.itemTextSelected]}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          {/* Actions */}
          <View style={pickerStyles.footer}>
            <TouchableOpacity onPress={onClose} style={pickerStyles.cancelBtn}>
              <Text style={pickerStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={pickerStyles.confirmBtn}>
              <Text style={pickerStyles.confirmText}>Set Time</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  dialog: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 13,
    color: colors.textMutedDark,
    textTransform: "uppercase",
  },
  currentTimeDisplay: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 26,
    color: colors.primary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  subheading: {
    fontFamily: "Nunito_700Bold",
    fontSize: 11,
    color: colors.textMutedDark,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  presetsRow: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 14,
  },
  presetPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  presetPillActive: {
    backgroundColor: colors.orangeTint,
    borderColor: colors.primary,
  },
  presetText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 11.5,
    color: colors.textDark,
  },
  presetTextActive: {
    color: colors.primary,
  },
  columnsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginVertical: 12,
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 12,
  },
  col: {
    flex: 1,
    alignItems: "center",
  },
  colHeader: {
    fontFamily: "Nunito_700Bold",
    fontSize: 10.5,
    color: colors.textMutedDark,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  colScroll: {
    height: 140,
    width: "100%",
  },
  colonWrapper: {
    paddingTop: 18,
  },
  colon: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 22,
    color: colors.textMutedDark,
  },
  itemButton: {
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
  },
  itemButtonSelected: {
    backgroundColor: colors.primary,
  },
  itemText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: colors.textDark,
  },
  itemTextSelected: {
    color: "#ffffff",
    fontFamily: "Nunito_800ExtraBold",
  },
  footer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    alignItems: "center",
  },
  cancelText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 13,
    color: colors.textMutedDark,
  },
  confirmBtn: {
    flex: 1.4,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 13,
    color: "#ffffff",
  },
});

export default TimePickerModal;
