import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

interface SectionHeaderProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  info?: {
    description: string;
    example?: string;
  };
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  iconName,
  title,
  subtitle,
  info,
}) => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.row}>
        <View style={headerStyles.iconBox}>
          <Ionicons name={iconName} size={18} color={colors.primary} />
        </View>
        <View style={headerStyles.textCol}>
          <View style={headerStyles.titleRow}>
            <Text style={headerStyles.title}>{title}</Text>
            {info && (
              <TouchableOpacity
                onPress={() => setIsInfoExpanded((prev) => !prev)}
                style={headerStyles.infoButton}
                accessibilityRole="button"
                accessibilityLabel="Toggle info"
              >
                <Ionicons
                  name={isInfoExpanded ? "information-circle" : "information-circle-outline"}
                  size={16}
                  color={isInfoExpanded ? colors.primary : colors.textMutedDark}
                />
              </TouchableOpacity>
            )}
          </View>
          {subtitle ? <Text style={headerStyles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      {isInfoExpanded && info && (
        <View style={headerStyles.infoCallout}>
          <Text style={headerStyles.infoCalloutText}>{info.description}</Text>
          {info.example ? (
            <Text style={headerStyles.infoCalloutExample}>{info.example}</Text>
          ) : null}
        </View>
      )}
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.orangeTint,
    alignItems: "center",
    justifyContent: "center",
  },
  textCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 15,
    color: "#18181b",
  },
  infoButton: {
    padding: 2,
  },
  subtitle: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: "#71717a",
    marginTop: 1,
  },
  infoCallout: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#eef0f2",
  },
  infoCalloutText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: "#27272a",
  },
  infoCalloutExample: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11,
    color: "#71717a",
    marginTop: 4,
    fontStyle: "italic",
  },
});

export default SectionHeader;
