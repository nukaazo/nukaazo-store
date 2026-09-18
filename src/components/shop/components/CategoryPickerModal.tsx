import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { Category } from "../interface/shop.interface";

interface CategoryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategories: { id: string; name: string }[];
  onSelect: (selected: { id: string; name: string }[]) => void;
}

export const CategoryPickerModal: React.FC<CategoryPickerModalProps> = ({
  visible,
  onClose,
  categories,
  selectedCategories,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSelected, setTempSelected] = useState<{ id: string; name: string }[]>(
    selectedCategories
  );

  React.useEffect(() => {
    if (visible) {
      setTempSelected(selectedCategories);
      setSearchQuery("");
    }
  }, [visible, selectedCategories]);

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (cat: Category) => {
    const isSelected = tempSelected.some((s) => s.id === cat.id);
    if (isSelected) {
      setTempSelected((prev) => prev.filter((s) => s.id !== cat.id));
    } else {
      setTempSelected((prev) => [...prev, { id: cat.id, name: cat.categoryName }]);
    }
  };

  const handleConfirm = () => {
    onSelect(tempSelected);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <Pressable style={modalStyles.backdrop} onPress={onClose} />
        <View style={modalStyles.sheetContainer}>
          {/* Header */}
          <View style={modalStyles.headerRow}>
            <View>
              <Text style={modalStyles.title}>Select Categories</Text>
              <Text style={modalStyles.subtitle}>
                {tempSelected.length} {tempSelected.length === 1 ? "category" : "categories"} selected
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <Ionicons name="close" size={22} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={modalStyles.searchContainer}>
            <Ionicons name="search-outline" size={18} color={colors.textMutedDark} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search store categories..."
              placeholderTextColor={colors.textMuted}
              style={modalStyles.searchInput}
              clearButtonMode="while-editing"
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color={colors.textMutedDark} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Selected Preview Chips */}
          {tempSelected.length > 0 && (
            <View style={modalStyles.chipsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={modalStyles.chipsScroll}>
                {tempSelected.map((cat) => (
                  <View key={cat.id} style={modalStyles.chip}>
                    <Text style={modalStyles.chipText}>{cat.name}</Text>
                    <TouchableOpacity
                      onPress={() => setTempSelected((p) => p.filter((s) => s.id !== cat.id))}
                      style={modalStyles.chipRemove}
                    >
                      <Ionicons name="close" size={13} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Category List */}
          <ScrollView style={modalStyles.categoryList} showsVerticalScrollIndicator={false}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => {
                const isSelected = tempSelected.some((s) => s.id === cat.id);
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => toggleCategory(cat)}
                    style={[modalStyles.categoryRow, isSelected && modalStyles.categoryRowSelected]}
                  >
                    <View style={modalStyles.categoryInfoCol}>
                      <Text style={[modalStyles.categoryName, isSelected && modalStyles.categoryNameSelected]}>
                        {cat.categoryName}
                      </Text>
                      {cat.description ? (
                        <Text style={modalStyles.categoryDesc}>{cat.description}</Text>
                      ) : null}
                    </View>
                    <View
                      style={[
                        modalStyles.checkbox,
                        isSelected && modalStyles.checkboxSelected,
                      ]}
                    >
                      {isSelected && <Ionicons name="checkmark" size={14} color="#ffffff" />}
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={modalStyles.emptyContainer}>
                <Ionicons name="file-tray-outline" size={32} color={colors.textMuted} />
                <Text style={modalStyles.emptyText}>No categories match "{searchQuery}"</Text>
              </View>
            )}
          </ScrollView>

          {/* Footer Actions */}
          <View style={modalStyles.footerRow}>
            <TouchableOpacity
              onPress={() => setTempSelected([])}
              style={modalStyles.clearButton}
            >
              <Text style={modalStyles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={modalStyles.confirmButton}>
              <Text style={modalStyles.confirmButtonText}>Apply Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    paddingTop: 18,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 18,
    color: colors.textStrong,
  },
  subtitle: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: colors.textMutedDark,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.borderDivider,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.borderDefault,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 13,
    color: colors.textStrong,
  },
  chipsContainer: {
    marginBottom: 10,
  },
  chipsScroll: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.orangeTint,
    borderWidth: 1,
    borderColor: "rgba(232, 92, 28, 0.25)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
  },
  chipText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 11.5,
    color: colors.primary,
  },
  chipRemove: {
    padding: 2,
  },
  categoryList: {
    maxHeight: 280,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  categoryRowSelected: {
    backgroundColor: colors.orangeTint,
  },
  categoryInfoCol: {
    flex: 1,
  },
  categoryName: {
    fontFamily: "Nunito_700Bold",
    fontSize: 13.5,
    color: colors.textStrong,
  },
  categoryNameSelected: {
    color: colors.primary,
  },
  categoryDesc: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11,
    color: colors.textMutedDark,
    marginTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderDefault,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  checkboxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    gap: 8,
  },
  emptyText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 13,
    color: colors.textMutedDark,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderDivider,
    gap: 12,
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  clearButtonText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 13,
    color: colors.textMutedDark,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 13,
    color: "#ffffff",
  },
});

export default CategoryPickerModal;
