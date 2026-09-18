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

interface YearPickerModalProps {
  visible: boolean;
  initialYear?: string;
  onClose: () => void;
  onConfirm: (year: string) => void;
  startYear?: number;
  endYear?: number;
}

export const YearPickerModal: React.FC<YearPickerModalProps> = ({
  visible,
  initialYear,
  onClose,
  onConfirm,
  startYear = 1950,
  endYear = new Date().getFullYear(),
}) => {
  const currentYearStr = initialYear || `${endYear}`;
  const [selectedYear, setSelectedYear] = useState(currentYearStr);

  React.useEffect(() => {
    if (visible && initialYear) {
      setSelectedYear(initialYear);
    }
  }, [visible, initialYear]);

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
    (endYear - i).toString()
  );

  const handleConfirm = () => {
    onConfirm(selectedYear);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={yearStyles.overlay}>
        <Pressable style={yearStyles.backdrop} onPress={onClose} />
        <View style={yearStyles.dialog}>
          <View style={yearStyles.header}>
            <View>
              <Text style={yearStyles.title}>Established Year</Text>
              <Text style={yearStyles.subtitle}>Select the year your store was founded</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={yearStyles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={yearStyles.scroll} showsVerticalScrollIndicator={false}>
            {years.map((y) => {
              const isSelected = selectedYear === y;
              return (
                <TouchableOpacity
                  key={y}
                  onPress={() => setSelectedYear(y)}
                  style={[yearStyles.yearRow, isSelected && yearStyles.yearRowSelected]}
                >
                  <Text style={[yearStyles.yearText, isSelected && yearStyles.yearTextSelected]}>
                    {y}
                  </Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={18} color={colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={yearStyles.footer}>
            <TouchableOpacity onPress={onClose} style={yearStyles.cancelBtn}>
              <Text style={yearStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={yearStyles.confirmBtn}>
              <Text style={yearStyles.confirmText}>Select Year</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const yearStyles = StyleSheet.create({
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
    maxWidth: 320,
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
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: colors.textStrong,
  },
  subtitle: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11,
    color: colors.textMutedDark,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  scroll: {
    maxHeight: 240,
    marginVertical: 6,
  },
  yearRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  yearRowSelected: {
    backgroundColor: colors.orangeTint,
  },
  yearText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: colors.textDark,
  },
  yearTextSelected: {
    color: colors.primary,
    fontFamily: "Nunito_800ExtraBold",
  },
  footer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 11,
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
    flex: 1.3,
    backgroundColor: colors.primary,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 13,
    color: "#ffffff",
  },
});

export default YearPickerModal;
