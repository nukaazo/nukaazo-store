import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme/colors";
import { createShopContent } from "../content/createShop.content";

interface ShopSuccessViewProps {
  shopUrl?: string;
  onGoToDashboard: () => void;
  onViewDetails?: () => void;
}

export const ShopSuccessView: React.FC<ShopSuccessViewProps> = ({
  shopUrl,
  onGoToDashboard,
  onViewDetails,
}) => {
  const { width } = useWindowDimensions();
  const scaleAnim = useRef(new Animated.Value(0.4)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim, slideAnim]);

  return (
    <View style={successStyles.container}>
      <Animated.View
        style={[
          successStyles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Animated Check Circle */}
        <Animated.View
          style={[
            successStyles.iconCircle,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Ionicons name="checkmark" size={44} color="#ffffff" />
        </Animated.View>

        {/* Heading */}
        <Text style={successStyles.heading}>
          {createShopContent.success.heading}
        </Text>

        {/* Subtitle */}
        <Text style={successStyles.subtitle}>
          {createShopContent.success.subtitle}
        </Text>

        {/* Buttons */}
        <View style={successStyles.buttonGroup}>
          <TouchableOpacity
            style={successStyles.primaryButton}
            onPress={onGoToDashboard}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryHighlight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={successStyles.buttonGradient}
            >
              <Ionicons name="storefront-outline" size={18} color="#ffffff" />
              <Text style={successStyles.primaryButtonText}>
                {createShopContent.success.cta.primary}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

          {onViewDetails ? (
            <TouchableOpacity
              style={successStyles.secondaryButton}
              onPress={onViewDetails}
              activeOpacity={0.88}
            >
              <Ionicons name="eye-outline" size={18} color={colors.textDark} />
              <Text style={successStyles.secondaryButtonText}>
                {createShopContent.success.cta.secondary}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Footer */}
        <Text style={successStyles.footerText}>
          {createShopContent.success.footer}
        </Text>
      </Animated.View>
    </View>
  );
};

const successStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: colors.orangeTint,
  },
  heading: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 26,
    color: colors.textStrong,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 14,
    color: colors.textMutedDark,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
    paddingHorizontal: 12,
  },
  buttonGroup: {
    width: "100%",
    gap: 12,
    marginBottom: 36,
  },
  primaryButton: {
    borderRadius: 14,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
  },
  primaryButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 14.5,
    color: "#ffffff",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.borderDefault,
    backgroundColor: "#ffffff",
  },
  secondaryButtonText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: colors.textDark,
  },
  footerText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});

export default ShopSuccessView;
