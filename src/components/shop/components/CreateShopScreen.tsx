import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardSafeView } from "@/components/common/KeyboardSafeView";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { styles } from "../styles/createShop.styles";
import { createShopContent } from "../content/createShop.content";
import { CategoryPickerModal } from "./CategoryPickerModal";
import { TimePickerModal } from "./TimePickerModal";
import { YearPickerModal } from "./YearPickerModal";
import { ShopSuccessView } from "./ShopSuccessView";
import { useCreateShopHandler } from "../handlers/useCreateShopHandler";

export interface CreateShopScreenProps {
  onBack?: () => void;
  onSuccess?: (shopUrl: string) => void;
}

export const CreateShopScreen: React.FC<CreateShopScreenProps> = (props) => {
  const handler = useCreateShopHandler(props);

  if (handler.isSuccess) {
    return (
      <ShopSuccessView
        shopUrl={handler.createdShopUrl}
        onGoToDashboard={handler.handleGoToDashboard}
        onViewDetails={handler.handleGoToDashboard}
      />
    );
  }

  const insets = useSafeAreaInsets();
  const { formData } = handler;
  const hours = formData.extendedAttributes.detail.hours;

  return (
    <KeyboardSafeView style={styles.keyboardAvoid}>
        {/* ─── Top Header Bar (Clean, Minimal, No Top Save Button) ─── */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={handler.goToPrevStep}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#18181b" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{createShopContent.header.title}</Text>

          <View style={styles.headerStepBadge}>
            <Text style={styles.headerStepBadgeText}>Step {handler.currentStep} of 3</Text>
          </View>
        </View>

        {/* ─── Professional Linear Step Indicator ─── */}
        <View style={styles.stepperContainer}>
          <View style={styles.stepperRow}>
            {/* Step 1 Node */}
            <TouchableOpacity
              style={styles.stepNode}
              onPress={() => handler.setCurrentStep(1)}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.stepCircle,
                  handler.currentStep === 1 && styles.stepCircleActive,
                  handler.currentStep > 1 && styles.stepCircleCompleted,
                ]}
              >
                {handler.currentStep > 1 ? (
                  <Ionicons name="checkmark" size={14} color="#ffffff" />
                ) : (
                  <Text
                    style={[
                      styles.stepCircleText,
                      handler.currentStep === 1 && styles.stepCircleTextActive,
                    ]}
                  >
                    1
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  handler.currentStep === 1 && styles.stepLabelActive,
                  handler.currentStep > 1 && styles.stepLabelCompleted,
                ]}
              >
                Store Info
              </Text>
            </TouchableOpacity>

            {/* Connector 1→2 */}
            <View
              style={[
                styles.stepConnector,
                handler.currentStep > 1 && styles.stepConnectorCompleted,
              ]}
            />

            {/* Step 2 Node — only tappable if already completed step 1 */}
            <TouchableOpacity
              style={styles.stepNode}
              onPress={() => handler.currentStep > 1 && handler.setCurrentStep(2)}
              activeOpacity={handler.currentStep > 1 ? 0.75 : 1}
            >
              <View
                style={[
                  styles.stepCircle,
                  handler.currentStep === 2 && styles.stepCircleActive,
                  handler.currentStep > 2 && styles.stepCircleCompleted,
                ]}
              >
                {handler.currentStep > 2 ? (
                  <Ionicons name="checkmark" size={14} color="#ffffff" />
                ) : (
                  <Text
                    style={[
                      styles.stepCircleText,
                      handler.currentStep === 2 && styles.stepCircleTextActive,
                    ]}
                  >
                    2
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  handler.currentStep === 2 && styles.stepLabelActive,
                  handler.currentStep > 2 && styles.stepLabelCompleted,
                ]}
              >
                Location
              </Text>
            </TouchableOpacity>

            {/* Connector 2→3 */}
            <View
              style={[
                styles.stepConnector,
                handler.currentStep > 2 && styles.stepConnectorCompleted,
              ]}
            />

            {/* Step 3 Node — only tappable if already completed step 2 */}
            <TouchableOpacity
              style={styles.stepNode}
              onPress={() => handler.currentStep === 3 && handler.setCurrentStep(3)}
              activeOpacity={handler.currentStep === 3 ? 0.75 : 1}
            >
              <View
                style={[
                  styles.stepCircle,
                  handler.currentStep === 3 && styles.stepCircleActive,
                ]}
              >
                <Text
                  style={[
                    styles.stepCircleText,
                    handler.currentStep === 3 && styles.stepCircleTextActive,
                  ]}
                >
                  3
                </Text>
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  handler.currentStep === 3 && styles.stepLabelActive,
                ]}
              >
                Payments
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainWrapper}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {/* ══════════════════════════════════════════════════
                STEP 1: STORE BASICS & IDENTITY
            ══════════════════════════════════════════════════ */}
            {handler.currentStep === 1 && (
              <View>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeadingTitle}>Store Information</Text>
                  <Text style={styles.stepHeadingSubtitle}>
                    Enter your shop's basic identity so local shoppers can recognize your brand.
                  </Text>
                </View>

                {/* Banner Photo */}
                <View style={styles.bannerWrapper}>
                  {formData.extendedAttributes.bannerImage ? (
                    <Image
                      source={{ uri: formData.extendedAttributes.bannerImage }}
                      style={styles.bannerImage}
                      contentFit="cover"
                    />
                  ) : (
                    <View style={styles.bannerPlaceholder}>
                      <Ionicons name="image-outline" size={24} color="#a1a1aa" />
                      <Text style={styles.bannerPlaceholderText}>Storefront Cover Photo</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={handler.handlePickBannerImage}
                    style={styles.bannerEditBtn}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="camera-outline" size={13} color="#18181b" />
                    <Text style={styles.bannerEditText}>
                      {formData.extendedAttributes.bannerImage ? "Change" : "Add Cover"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Logo Avatar Row — wrapper is outside overflow:hidden so badge is visible */}
                <View style={styles.logoRow}>
                  <View style={styles.logoAvatarWrapper}>
                    <TouchableOpacity
                      onPress={handler.handlePickLogoImage}
                      style={styles.logoAvatar}
                      activeOpacity={0.85}
                    >
                      {formData.extendedAttributes.logoImage ? (
                        <Image
                          source={{ uri: formData.extendedAttributes.logoImage }}
                          style={styles.logoImage}
                          contentFit="cover"
                        />
                      ) : (
                        <Text style={styles.logoInitials}>
                          {formData.shopName ? formData.shopName.substring(0, 2).toUpperCase() : "NS"}
                        </Text>
                      )}
                    </TouchableOpacity>
                    {/* Badge sits on the wrapper, outside overflow:hidden */}
                    <View style={styles.logoEditBadge} pointerEvents="none">
                      <Ionicons name="camera" size={13} color="#ffffff" />
                    </View>
                  </View>
                  <View style={styles.logoTextCol}>
                    <Text style={styles.logoTextTitle}>Store Logo / Avatar</Text>
                    <Text style={styles.logoTextSubtitle}>
                      Tap to upload your brand logo or shop sign
                    </Text>
                  </View>
                </View>

                {/* Store Name Input */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>
                      {createShopContent.labels.storeName} <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={formData.shopName}
                    onChangeText={(val) => handler.updateField("shopName", val)}
                    placeholder={createShopContent.placeholders.storeName}
                    placeholderTextColor="#a1a1aa"
                  />
                </View>

                {/* Store Categories Selector */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>
                      Store Categories <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                    <Text style={styles.fieldOptional}>
                      {formData.categories.length > 0
                        ? `${formData.categories.length} chosen`
                        : "Required"}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handler.setIsCategoryModalVisible(true)}
                    style={styles.selectTrigger}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={
                        formData.categories.length > 0
                          ? styles.selectTriggerText
                          : styles.selectTriggerPlaceholder
                      }
                    >
                      {formData.categories.length > 0
                        ? `${formData.categories.length} categories selected`
                        : createShopContent.placeholders.categoryPicker}
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#71717a" />
                  </TouchableOpacity>

                  {/* Chips Preview */}
                  {formData.categories.length > 0 && (
                    <View style={styles.chipsContainer}>
                      {formData.categories.map((cat) => (
                        <View key={cat.id} style={styles.categoryChip}>
                          <Text style={styles.categoryChipText}>{cat.name}</Text>
                          <TouchableOpacity
                            onPress={() =>
                              handler.updateField(
                                "categories",
                                formData.categories.filter((c) => c.id !== cat.id)
                              )
                            }
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          >
                            <Ionicons name="close" size={14} color={colors.primary} />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* Established Year */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>{createShopContent.labels.establishedYear}</Text>
                    <Text style={styles.fieldOptional}>Optional</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handler.setIsYearModalVisible(true)}
                    style={styles.selectTrigger}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={
                        formData.extendedAttributes.established
                          ? styles.selectTriggerText
                          : styles.selectTriggerPlaceholder
                      }
                    >
                      {formData.extendedAttributes.established ||
                        createShopContent.placeholders.establishedYear}
                    </Text>
                    <Ionicons name="calendar-outline" size={16} color="#71717a" />
                  </TouchableOpacity>
                </View>

                {/* About Store */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>{createShopContent.labels.aboutStore}</Text>
                    <Text style={styles.fieldOptional}>Optional</Text>
                  </View>
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    value={formData.extendedAttributes.detail.about}
                    onChangeText={(val) => handler.updateDetailField("about", val)}
                    placeholder={createShopContent.placeholders.aboutStore}
                    placeholderTextColor="#a1a1aa"
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>
            )}

            {/* ══════════════════════════════════════════════════
                STEP 2: LOCATION & OPERATING HOURS
            ══════════════════════════════════════════════════ */}
            {handler.currentStep === 2 && (
              <View>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeadingTitle}>Location & Operating Hours</Text>
                  <Text style={styles.stepHeadingSubtitle}>
                    Pin your store location and configure your daily business timings.
                  </Text>
                </View>

                {/* Address Line 1 */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>
                      {createShopContent.labels.addressLine1} <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={formData.extendedAttributes.detail.address.line1}
                    onChangeText={(val) => handler.updateAddress("line1", val)}
                    placeholder={createShopContent.placeholders.addressLine1}
                    placeholderTextColor="#a1a1aa"
                  />
                </View>

                {/* Address Line 2 */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>{createShopContent.labels.addressLine2}</Text>
                    <Text style={styles.fieldOptional}>Optional</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={formData.extendedAttributes.detail.address.line2}
                    onChangeText={(val) => handler.updateAddress("line2", val)}
                    placeholder={createShopContent.placeholders.addressLine2}
                    placeholderTextColor="#a1a1aa"
                  />
                </View>

                {/* Map Coordinates & GPS helper */}
                <View style={styles.locationCard}>
                  <View style={styles.locationCardHeader}>
                    <View style={styles.locationCoordRow}>
                      <View style={styles.locationDot} />
                      <Text style={styles.locationCoordText}>
                        GPS: {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lon.toFixed(4)}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={handler.handleUseCurrentLocation}
                      style={styles.detectLocationBtn}
                      disabled={handler.isDetectingLocation}
                      activeOpacity={0.8}
                    >
                      {handler.isDetectingLocation ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                      ) : (
                        <Ionicons name="navigate-outline" size={13} color="#ffffff" />
                      )}
                      <Text style={styles.detectLocationText}>
                        {handler.isDetectingLocation ? "Detecting..." : "Use Current GPS"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.presetLabel}>Or select quick city preset:</Text>
                  <View style={styles.cityPresetsRow}>
                    {handler.cityPresets.map((preset) => {
                      const isSelected =
                        formData.coordinates.lat === preset.lat &&
                        formData.coordinates.lon === preset.lon;
                      return (
                        <TouchableOpacity
                          key={preset.name}
                          onPress={() => handler.handleSelectPresetCity(preset)}
                          style={[
                            styles.cityPresetPill,
                            isSelected && styles.cityPresetPillActive,
                          ]}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.cityPresetText,
                              isSelected && styles.cityPresetTextActive,
                            ]}
                          >
                            {preset.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Closing Time */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>{createShopContent.labels.openUntil}</Text>
                    <Text style={styles.fieldOptional}>General Closing</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handler.setTimeModalTarget({ type: "openUntil" });
                      handler.setIsTimeModalVisible(true);
                    }}
                    style={styles.selectTrigger}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={
                        formData.extendedAttributes.openUntil
                          ? styles.selectTriggerText
                          : styles.selectTriggerPlaceholder
                      }
                    >
                      {formData.extendedAttributes.openUntil ||
                        createShopContent.placeholders.openUntil}
                    </Text>
                    <Ionicons name="time-outline" size={16} color="#71717a" />
                  </TouchableOpacity>
                </View>

                {/* Weekly Operating Schedule */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>Weekly Schedule</Text>
                  </View>

                  <View style={styles.scheduleCard}>
                    <View style={styles.scheduleHeader}>
                      <Text style={styles.scheduleHeaderTitle}>Daily Operating Hours</Text>
                      <TouchableOpacity
                        onPress={handler.applyTimingsToAllDays}
                        style={styles.scheduleApplyAllBtn}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.scheduleApplyAllText}>Apply Mon to All</Text>
                      </TouchableOpacity>
                    </View>

                    {hours.map((dayItem, idx) => (
                      <View
                        key={dayItem.day}
                        style={[
                          styles.dayScheduleRow,
                          idx === hours.length - 1 && styles.dayScheduleRowLast,
                        ]}
                      >
                        <View style={styles.dayInfoCol}>
                          <Switch
                            value={dayItem.open}
                            onValueChange={() => handler.toggleDayOpen(idx)}
                            trackColor={{ false: "#e4e4e7", true: colors.primary }}
                            thumbColor="#ffffff"
                          />
                          <Text style={styles.dayName}>{dayItem.day.substring(0, 3)}</Text>
                        </View>

                        <View style={styles.dayTimesCol}>
                          {dayItem.open ? (
                            <>
                              <TouchableOpacity
                                onPress={() => {
                                  handler.setTimeModalTarget({
                                    type: "day",
                                    dayIndex: idx,
                                    field: "openTime",
                                  });
                                  handler.setIsTimeModalVisible(true);
                                }}
                                style={styles.timeChip}
                              >
                                <Text style={styles.timeChipText}>{dayItem.openTime}</Text>
                              </TouchableOpacity>

                              <Text style={styles.timeDash}>-</Text>

                              <TouchableOpacity
                                onPress={() => {
                                  handler.setTimeModalTarget({
                                    type: "day",
                                    dayIndex: idx,
                                    field: "closeTime",
                                  });
                                  handler.setIsTimeModalVisible(true);
                                }}
                                style={styles.timeChip}
                              >
                                <Text style={styles.timeChipText}>{dayItem.closeTime}</Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                            <View style={styles.closedBadge}>
                              <Text style={styles.closedText}>Closed</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* ══════════════════════════════════════════════════
                STEP 3: PAYMENTS, SETTLEMENTS & LAUNCH
            ══════════════════════════════════════════════════ */}
            {handler.currentStep === 3 && (
              <View>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepHeadingTitle}>Payouts & Store Highlights</Text>
                  <Text style={styles.stepHeadingSubtitle}>
                    Enter your UPI ID to receive direct settlements, and add perks that make your store stand out.
                  </Text>
                </View>

                {/* UPI Settlement Field */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>
                      {createShopContent.labels.upiId} <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                    {handler.isUpiVerified && (
                      <View style={styles.upiVerifiedBadge}>
                        <Ionicons name="checkmark-circle" size={13} color={colors.primary} />
                        <Text style={styles.upiVerifiedText}>Verified</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.upiInputRow}>
                    <TextInput
                      style={styles.upiInput}
                      value={formData.extendedAttributes.detail.bankAccountDetails.upiId}
                      onChangeText={handler.updateUpi}
                      placeholder={createShopContent.placeholders.upiId}
                      placeholderTextColor="#a1a1aa"
                      autoCapitalize="none"
                    />

                    {!handler.isUpiVerified && (
                      <TouchableOpacity
                        onPress={handler.handleVerifyUpi}
                        style={styles.upiVerifyBtn}
                        disabled={handler.isVerifyingUpi}
                        activeOpacity={0.8}
                      >
                        {handler.isVerifyingUpi ? (
                          <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                          <Text style={styles.upiVerifyBtnText}>Verify</Text>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>

                  {handler.upiHolderName && (
                    <Text style={styles.upiHolderText}>
                      ✓ Account Name: {handler.upiHolderName}
                    </Text>
                  )}
                </View>

                {/* Store Gallery */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>{createShopContent.sections.gallery.title}</Text>
                    <Text style={styles.fieldOptional}>Up to 5 photos</Text>
                  </View>

                  <View style={styles.galleryGrid}>
                    {(formData.extendedAttributes.detail.gallery || []).map((uri, idx) => (
                      <View key={idx} style={styles.galleryPhotoWrapper}>
                        <Image source={{ uri }} style={styles.galleryPhotoImage} contentFit="cover" />
                        <TouchableOpacity
                          onPress={() => handler.handleRemoveGalleryPhoto(idx)}
                          style={styles.galleryPhotoDelete}
                        >
                          <Ionicons name="trash-outline" size={11} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    ))}

                    {(formData.extendedAttributes.detail.gallery || []).length < 5 && (
                      <TouchableOpacity
                        onPress={handler.handlePickGalleryPhoto}
                        style={styles.addPhotoButton}
                        activeOpacity={0.75}
                      >
                        <Ionicons name="add" size={20} color={colors.primary} />
                        <Text style={styles.addPhotoText}>Add Photo</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* Store Highlights */}
                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>{createShopContent.sections.features.title}</Text>
                    <Text style={styles.fieldOptional}>Badges & Perks</Text>
                  </View>

                  <View style={styles.featuresContainer}>
                    {(formData.extendedAttributes.detail.features || []).map((feature, idx) => (
                      <View key={idx} style={styles.featureItem}>
                        <View style={styles.featureIconBox}>
                          <Ionicons name="ribbon-outline" size={16} color="#7c3aed" />
                        </View>
                        <View style={styles.featureInputs}>
                          <TextInput
                            style={styles.featureTitleInput}
                            value={feature.title}
                            onChangeText={(val) => handler.handleUpdateFeature(idx, "title", val)}
                            placeholder="Perk Title (e.g. Free Delivery)"
                            placeholderTextColor="#a1a1aa"
                          />
                          <TextInput
                            style={styles.featureSubtitleInput}
                            value={feature.subtitle}
                            onChangeText={(val) => handler.handleUpdateFeature(idx, "subtitle", val)}
                            placeholder="Description (e.g. Orders above ₹499)"
                            placeholderTextColor="#a1a1aa"
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => handler.handleRemoveFeature(idx)}
                          style={styles.removeFeatureBtn}
                        >
                          <Ionicons name="close-circle-outline" size={20} color="#a1a1aa" />
                        </TouchableOpacity>
                      </View>
                    ))}

                    <TouchableOpacity
                      onPress={handler.handleAddFeature}
                      style={styles.addFeatureBtn}
                      activeOpacity={0.75}
                    >
                      <Ionicons name="add" size={16} color={colors.secondary} />
                      <Text style={styles.addFeatureText}>Add Store Highlight</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* ─── Fixed Bottom Navigation Bar (No Clutter, Clean Action) ─── */}
          <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
            {handler.currentStep > 1 && (
              <TouchableOpacity
                style={styles.backStepBtn}
                onPress={handler.goToPrevStep}
                activeOpacity={0.7}
              >
                <Text style={styles.backStepBtnText}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.continueBtn,
                handler.isSaving && styles.continueBtnDisabled,
              ]}
              onPress={handler.goToNextStep}
              disabled={handler.isSaving}
              activeOpacity={0.88}
            >
              {handler.isSaving ? (
                <>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={styles.continueBtnText}>Saving Store...</Text>
                </>
              ) : handler.currentStep === 3 ? (
                <>
                  <Ionicons name="rocket-outline" size={18} color="#ffffff" />
                  <Text style={styles.continueBtnText}>Complete & Launch Store</Text>
                </>
              ) : (
                <>
                  <Text style={styles.continueBtnText}>
                    {handler.currentStep === 1
                      ? "Continue to Location"
                      : "Continue to Payments"}
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Modals ─── */}
        <CategoryPickerModal
          visible={handler.isCategoryModalVisible}
          onClose={() => handler.setIsCategoryModalVisible(false)}
          categories={handler.categories}
          selectedCategories={formData.categories}
          onSelect={(selected) => handler.updateField("categories", selected)}
        />

        <YearPickerModal
          visible={handler.isYearModalVisible}
          initialYear={formData.extendedAttributes.established}
          onClose={() => handler.setIsYearModalVisible(false)}
          onConfirm={(year: string) => handler.updateExtAttribute("established", year)}
        />

        <TimePickerModal
          visible={handler.isTimeModalVisible}
          title={
            handler.timeModalTarget.type === "openUntil"
              ? "Select Closing Time"
              : `Select ${
                  handler.timeModalTarget.field === "openTime" ? "Opening" : "Closing"
                } Time`
          }
          initialTime={
            handler.timeModalTarget.type === "openUntil"
              ? formData.extendedAttributes.openUntil || "21:00"
              : hours[handler.timeModalTarget.dayIndex]?.[
                  handler.timeModalTarget.field
                ] || "09:00"
          }
          onClose={() => handler.setIsTimeModalVisible(false)}
          onConfirm={(time) => {
            if (handler.timeModalTarget.type === "openUntil") {
              handler.updateExtAttribute("openUntil", time);
            } else {
              handler.setDayTime(
                handler.timeModalTarget.dayIndex,
                handler.timeModalTarget.field,
                time
              );
            }
          }}
        />
    </KeyboardSafeView>
  );
};

export default CreateShopScreen;
