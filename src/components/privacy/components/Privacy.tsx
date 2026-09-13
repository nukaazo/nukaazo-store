import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { privacyContent } from '../content/privacy.content';
import { styles } from '../styles/Privacy.styles';

export default function Privacy() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              { backgroundColor: pressed ? colors.borderDivider : 'transparent' },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color={colors.textStrong} />
          </Pressable>
          <Text style={styles.headerTitle}>{privacyContent.title}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIconCircle}>
            <Ionicons name="shield-checkmark-outline" size={22} color={colors.surface} />
          </View>
          <Text style={styles.heroTitle}>{privacyContent.hero.title}</Text>
          <Text style={styles.heroSubtitle}>{privacyContent.hero.subtitle}</Text>
        </View>

        {/* Last Updated chip */}
        <View style={styles.updatedChip}>
          <Ionicons name="time-outline" size={12} color={colors.secondary} />
          <Text style={styles.updatedChipText}>{privacyContent.lastUpdated}</Text>
        </View>

        {/* Intro card */}
        <View style={styles.introCard}>
          <Text style={styles.introText}>{privacyContent.intro}</Text>
          <Text style={styles.consentNoteText}>{privacyContent.consentNote}</Text>
        </View>

        {/* Sections */}
        {privacyContent.sections.map((section) => (
          <View key={section.id} style={styles.sectionCard}>
            {/* Section header */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>{section.number}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            <View style={styles.dividerLine} />

            <View style={styles.sectionBody}>
              {/* Body text */}
              {section.body ? (
                <Text style={styles.sectionBodyText}>{section.body}</Text>
              ) : null}

              {/* Top-level bullet points */}
              {section.bullets.map((bullet, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <View style={styles.bulletTextGroup}>
                    <Text style={styles.bulletLabel}>{bullet.label}: </Text>
                    <Text style={styles.bulletText}>{bullet.text}</Text>
                  </View>
                </View>
              ))}

              {/* Subsections (e.g. 1.1, 1.2) */}
              {(section as any).subsections && (section as any).subsections.map((sub: any) => (
                <View key={sub.id} style={styles.subsectionBlock}>
                  <Text style={styles.subsectionTitle}>{sub.title}</Text>
                  {sub.body ? (
                    <Text style={styles.subsectionBody}>{sub.body}</Text>
                  ) : null}
                  {sub.bullets.map((bullet: any, idx: number) => (
                    <View key={idx} style={styles.bulletItem}>
                      <View style={styles.bulletDot} />
                      <View style={styles.bulletTextGroup}>
                        <Text style={styles.bulletLabel}>{bullet.label}: </Text>
                        <Text style={styles.bulletText}>{bullet.text}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}

              {/* Grievance Officer (Section 7) */}
              {(section as any).grievanceOfficer && (
                <View style={styles.grievanceCard}>
                  <Text style={styles.grievanceCardTitle}>
                    Grievance Officer Information
                  </Text>
                  <View style={styles.grievanceRow}>
                    <Text style={styles.grievanceLabel}>Name:</Text>
                    <Text style={styles.grievanceValue}>
                      {(section as any).grievanceOfficer.name}
                    </Text>
                  </View>
                  <View style={styles.grievanceRow}>
                    <Text style={styles.grievanceLabel}>Email:</Text>
                    <Text style={styles.grievanceEmail}>
                      {(section as any).grievanceOfficer.email}
                    </Text>
                  </View>
                  <View style={styles.grievanceRow}>
                    <Text style={styles.grievanceLabel}>Address:</Text>
                    <Text style={styles.grievanceValue}>
                      {(section as any).grievanceOfficer.address}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Footer note */}
        <View style={styles.footerCard}>
          <Ionicons name="information-circle-outline" size={16} color={colors.secondary} />
          <Text style={styles.footerText}>{privacyContent.footerNote}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
