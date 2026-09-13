import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { termsContent } from '../content/terms.content';
import { styles } from '../styles/Terms.styles';

export default function Terms() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              { backgroundColor: pressed ? '#f4f4f5' : 'transparent' },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#18181b" />
          </Pressable>
          <Text style={styles.headerTitle}>{termsContent.title}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIconCircle}>
            <Ionicons name="document-text-outline" size={22} color="#ffffff" />
          </View>
          <Text style={styles.heroTitle}>{termsContent.hero.title}</Text>
          <Text style={styles.heroSubtitle}>{termsContent.hero.subtitle}</Text>
        </View>

        {/* Last Updated chip */}
        <View style={styles.updatedChip}>
          <Ionicons name="time-outline" size={12} color={colors.secondary} />
          <Text style={styles.updatedChipText}>{termsContent.lastUpdated}</Text>
        </View>

        {/* Intro card */}
        <View style={styles.introCard}>
          <Text style={styles.introText}>{termsContent.intro}</Text>
          <Text style={styles.companyNoteText}>{termsContent.companyNote}</Text>
        </View>

        {/* Sections */}
        {termsContent.sections.map((section) => (
          <View key={section.id} style={styles.sectionCard}>
            {/* Section header row */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>{section.number}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            {/* Section body */}
            <View style={styles.dividerLine} />
            <View style={styles.sectionBody}>
              {section.body ? (
                <Text style={styles.sectionBodyText}>{section.body}</Text>
              ) : null}

              {/* Bullet points */}
              {section.bullets.map((bullet, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <View style={styles.bulletDot} />
                  <View style={styles.bulletTextGroup}>
                    <Text style={styles.bulletLabel}>{bullet.label}: </Text>
                    <Text style={styles.bulletText}>{bullet.text}</Text>
                  </View>
                </View>
              ))}

              {/* Grievance Officer (Section 9) */}
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
          <Ionicons name="information-circle-outline" size={16} color="#e85c1c" />
          <Text style={styles.footerText}>{termsContent.footerNote}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
