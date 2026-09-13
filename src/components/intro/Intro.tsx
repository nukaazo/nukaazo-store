import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, StatusBar, Text, View, useWindowDimensions } from "react-native";
import { ROUTES } from '@/helper/routes';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { colors } from "../../theme/colors";
import { introContent } from "./content/intro.content";
import { styles } from "./Intro.styles";

export default function Intro() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ─── 100% Background Image ─── */}
      <Image
        source={require('../../../assets/images/delivery-hero-3d.png')}
        style={styles.backgroundImage}
        contentFit="cover"
        transition={0}
      />

      {/* ─── Bottom Content Area ─── */}
      <View style={styles.bottomWrapper}>
        
        {/* Double-layered Torn Paper Effect Edge */}
        <View style={styles.tornPaperWrapper}>
          
          {/* Layer 1: Darker Paper Shadow Layer */}
          <Svg height="32" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={styles.tornShadow}>
            <Path
              d="M 0 8 L 2 9 L 4 6 L 6 8 L 8 11 L 9 7 L 10 21 L 13 22 L 15 11 L 16 7 L 18 9 L 20 3 L 22 4 L 24 10 L 26 8 L 28 9 L 30 9 L 32 14 L 34 19 L 36 17 L 38 14 L 40 15 L 42 12 L 44 15 L 46 13 L 48 7 L 50 8 L 52 6 L 54 9 L 56 12 L 58 10 L 60 11 L 62 9 L 64 11 L 66 8 L 68 4 L 70 5 L 72 12 L 74 10 L 76 13 L 78 21 L 80 18 L 82 18 L 84 14 L 86 17 L 88 9 L 90 8 L 92 7 L 94 11 L 96 9 L 98 7 L 100 5 L 100 30 L 0 30 Z"
              fill="rgba(185, 168, 145, 0.95)"
            />
          </Svg>

          {/* Layer 2: White Ripped Paper Fiber Layer */}
          <Svg height="32" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={styles.tornFiber}>
            <Path
              d="M 0 10 L 2 11 L 4 8 L 6 10 L 8 13 L 9 9 L 10 23 L 13 24 L 15 13 L 16 9 L 18 11 L 20 5 L 22 6 L 24 12 L 26 10 L 28 11 L 30 11 L 32 16 L 34 21 L 36 19 L 38 16 L 40 17 L 42 14 L 44 17 L 46 15 L 48 9 L 50 10 L 52 8 L 54 11 L 56 14 L 58 12 L 60 13 L 62 11 L 64 13 L 66 10 L 68 6 L 70 7 L 72 14 L 74 12 L 76 15 L 78 23 L 80 20 L 82 20 L 84 16 L 86 19 L 88 11 L 90 10 L 92 9 L 94 13 L 96 11 L 98 9 L 100 7 L 100 30 L 0 30 Z"
              fill="#ffffff"
            />
          </Svg>
          
          {/* Layer 3: Main Cream Paper Layer */}
          <Svg height="32" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={styles.tornMain}>
            <Path
              d="M 0 12 L 2 13 L 4 10 L 6 12 L 8 15 L 9 11 L 10 25 L 13 26 L 15 11 L 20 7 L 22 8 L 24 14 L 26 12 L 28 13 L 30 13 L 32 18 L 34 23 L 36 21 L 38 18 L 40 19 L 42 16 L 44 19 L 46 17 L 48 11 L 50 12 L 52 10 L 54 13 L 56 16 L 58 14 L 60 15 L 62 13 L 64 15 L 66 12 L 68 8 L 70 9 L 72 16 L 74 14 L 76 17 L 78 25 L 82 22 L 82 22 L 84 18 L 86 21 L 88 13 L 90 12 L 92 11 L 94 15 L 96 13 L 98 11 L 100 9 L 100 30 L 0 30 Z"
              fill={colors.background}
            />
          </Svg>

          {/* Hanging Torn Paper Strip */}
          <View style={{ position: 'absolute', left: '72%', top: 12, width: 20, height: 28, zIndex: 12 }}>
            <Svg height="28" width="20" viewBox="0 0 20 28" preserveAspectRatio="none" style={{ position: 'absolute', top: 2, left: 1 }}>
              <Path
                d="M 3 0 C 5 8, 8 16, 12 25 C 9 26, 5 24, 1 22 C 2 14, 2 7, 3 0 Z"
                fill="rgba(0, 0, 0, 0.12)"
              />
            </Svg>
            <Svg height="28" width="20" viewBox="0 0 20 28" preserveAspectRatio="none">
              <Path
                d="M 3 0 C 5 8, 8 16, 12 25 C 9 26, 5 24, 1 22 C 2 14, 2 7, 3 0 Z"
                fill={colors.background}
              />
            </Svg>
          </View>
        </View>

        {/* Solid Cream Content Sheet */}
        <View style={[styles.contentContainer, { paddingBottom: Math.max(16, (isSmallScreen ? 8 : 14) + insets.bottom) }]}>
          
          {/* Headline and Description */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {introContent.titleParts.map((part, index) => (
                <Text key={index} style={part.highlight ? styles.primaryText : undefined}>
                  {part.text}
                </Text>
              ))}
            </Text>

            <Text style={styles.description}>
              {introContent.description}
            </Text>
          </View>

          {/* Clean Flat CTA Button */}
          <View style={styles.buttonWrapper}>
            <Pressable
              style={styles.button}
              onPress={() => router.push(ROUTES.LOGIN)}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryHighlight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{introContent.buttonText}</Text>
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={16} color="#FFFFFF" style={styles.chevron} />
                </View>
              </LinearGradient>
            </Pressable>
          </View>

          {/* Subtle Flat Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{introContent.footerText}</Text>
          </View>

        </View>
      </View>
    </View>
  );
}
