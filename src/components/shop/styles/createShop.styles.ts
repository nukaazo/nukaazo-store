import { StyleSheet, Platform } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardAvoid: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },

  // ─── Top Header Bar (Compact) ───
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f2",
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#f5f5f6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eaecef",
  },
  headerTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 15,
    color: "#18181b",
    letterSpacing: 0,
  },
  headerStepBadge: {
    backgroundColor: colors.orangeTint,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(232, 92, 28, 0.2)",
  },
  headerStepBadgeText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11,
    color: colors.primary,
  },

  // ─── Professional Linear Step Indicator ───
  stepperContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f6",
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepNode: {
    alignItems: "center",
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#f0f0f2",
    borderWidth: 1.5,
    borderColor: "#e4e4e7",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepCircleCompleted: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  stepCircleText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11,
    color: "#a1a1aa",
  },
  stepCircleTextActive: {
    color: "#ffffff",
  },
  stepLabel: {
    fontFamily: "Nunito_400Regular",
    fontSize: 9.5,
    color: "#a1a1aa",
    marginTop: 4,
    textAlign: "center",
  },
  stepLabelActive: {
    fontFamily: "Nunito_600SemiBold",
    color: colors.primary,
  },
  stepLabelCompleted: {
    color: colors.secondary,
  },
  stepConnector: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#e4e4e7",
    marginBottom: 16,
    marginHorizontal: 4,
  },
  stepConnectorCompleted: {
    backgroundColor: colors.secondary,
  },
  stepTabLabelActive: {
    color: colors.primary,
  },

  // ─── Scroll Container ───
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
  },

  // ─── Step Heading Banner ───
  stepHeader: {
    marginBottom: 14,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  stepHeadingTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: "#18181b",
  },
  stepHeadingSubtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11.5,
    color: "#71717a",
    marginTop: 2,
    lineHeight: 15,
  },

  // ─── Banner & Logo Row (Step 1) ───
  bannerWrapper: {
    width: "100%",
    height: 124,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#eef0f2",
    overflow: "hidden",
    position: "relative",
    marginBottom: 16,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  bannerPlaceholderText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    color: "#a1a1aa",
  },
  bannerEditBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eef0f2",
  },
  bannerEditText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 10.5,
    color: "#27272a",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  // Logo wrapper — overflow visible so badge is not clipped
  logoAvatarWrapper: {
    width: 64,
    height: 64,
    position: "relative",
  },
  logoAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.orangeTint,
    borderWidth: 2,
    borderColor: "#f0f0f2",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  logoInitials: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
    color: colors.primary,
  },
  // Badge sits OUTSIDE the avatar circle, on the wrapper
  logoEditBadge: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "#ffffff",
    zIndex: 10,
  },
  logoTextCol: {
    flex: 1,
  },
  logoTextTitle: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12.5,
    color: "#18181b",
  },
  logoTextSubtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    color: "#a1a1aa",
    marginTop: 2,
  },

  // ─── Form Fields ───
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  fieldLabel: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: "#52525b",
  },
  requiredAsterisk: {
    color: colors.primary,
    fontFamily: "Nunito_600SemiBold",
  },
  fieldOptional: {
    fontFamily: "Nunito_400Regular",
    fontSize: 10.5,
    color: "#a1a1aa",
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 13,
    fontFamily: "Nunito_400Regular",
    fontSize: 13.5,
    color: "#18181b",
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: "#ffffff",
  },
  textarea: {
    minHeight: 82,
    textAlignVertical: "top",
    paddingTop: 11,
    paddingBottom: 11,
  },

  // Row 2 Col
  row2Col: {
    flexDirection: "row",
    gap: 12,
  },
  col: {
    flex: 1,
  },

  // Select Trigger
  selectTrigger: {
    height: 46,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectTriggerText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 13.5,
    color: "#18181b",
  },
  selectTriggerPlaceholder: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    color: "#b0b0b4",
  },

  // ─── Category Chips ───
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.orangeTint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(232, 92, 28, 0.2)",
  },
  categoryChipText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11.5,
    color: colors.primary,
  },

  // ─── Section Dividers ───
  sectionDivider: {
    height: 1,
    backgroundColor: "#f4f4f6",
    marginVertical: 20,
  },

  // ─── Step 2: Location Helpers (Teal theme) ───
  locationCard: {
    backgroundColor: colors.tealTint,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0, 99, 99, 0.15)",
    marginBottom: 18,
  },
  locationCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationCoordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.secondary,
  },
  locationCoordText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: colors.secondary,
  },
  detectLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.secondary,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detectLocationText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11.5,
    color: "#ffffff",
  },
  presetLabel: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    color: "#71717a",
    marginTop: 10,
    marginBottom: 6,
  },
  cityPresetsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  cityPresetPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderColor: "rgba(0, 99, 99, 0.2)",
  },
  cityPresetPillActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  cityPresetText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    color: colors.secondary,
  },
  cityPresetTextActive: {
    color: "#ffffff",
  },

  // ─── Step 2: Weekly Schedule ───
  scheduleCard: {
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 4,
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f6",
  },
  scheduleHeaderTitle: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12.5,
    color: "#27272a",
  },
  scheduleApplyAllBtn: {
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  scheduleApplyAllText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11.5,
    color: colors.secondary,
  },
  dayScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f6",
  },
  dayScheduleRowLast: {
    borderBottomWidth: 0,
  },
  dayInfoCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 100,
  },
  dayName: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12.5,
    color: "#27272a",
  },
  dayTimesCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
    justifyContent: "flex-end",
  },
  timeChip: {
    backgroundColor: colors.tealTint,
    borderWidth: 1,
    borderColor: "rgba(0, 99, 99, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeChipText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11.5,
    color: colors.secondary,
  },
  timeDash: {
    color: "#c4c4c8",
    fontSize: 11,
  },
  closedBadge: {
    backgroundColor: "#f4f4f6",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 5,
  },
  closedText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    color: "#a1a1aa",
  },

  // ─── Step 3: Payments (UPI — Green success theme) ───
  upiInputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 13,
    paddingRight: 6,
    height: 46,
  },
  upiInput: {
    flex: 1,
    fontFamily: "Nunito_400Regular",
    fontSize: 13.5,
    color: "#18181b",
  },
  upiVerifyBtn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
  },
  upiVerifyBtnText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12,
    color: "#ffffff",
  },
  upiVerifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#ecfdf5",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },
  upiVerifiedText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11.5,
    color: colors.progressGreen,
  },
  upiHolderText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11.5,
    color: colors.progressGreen,
    marginTop: 5,
  },

  // Bank fields
  bankFieldsBox: {
    marginTop: 12,
    padding: 14,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f2",
    gap: 12,
  },

  // ─── Gallery Photos (Step 3) ───
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  galleryPhotoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  galleryPhotoImage: {
    width: "100%",
    height: "100%",
  },
  galleryPhotoDelete: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(24, 24, 27, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoButton: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderStyle: "dashed",
    backgroundColor: colors.tealTint,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  addPhotoText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 10.5,
    color: colors.secondary,
  },

  // ─── Features List (Step 3) ───
  featuresContainer: {
    gap: 10,
    marginTop: 6,
  },
  featureItem: {
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.purpleTint,
    alignItems: "center",
    justifyContent: "center",
  },
  featureInputs: {
    flex: 1,
    gap: 3,
  },
  featureTitleInput: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12.5,
    color: "#18181b",
    padding: 0,
  },
  featureSubtitleInput: {
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    color: "#71717a",
    padding: 0,
  },
  removeFeatureBtn: {
    padding: 4,
  },
  addFeatureBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 99, 99, 0.25)",
    backgroundColor: colors.tealTint,
    borderRadius: 10,
    marginTop: 6,
  },
  addFeatureText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 12.5,
    color: colors.secondary,
  },

  // ─── Fixed Bottom Navigation Bar ───
  bottomBar: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f4f4f6",
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  backStepBtn: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  backStepBtnText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 13.5,
    color: "#52525b",
  },
  continueBtn: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  continueBtnDisabled: {
    opacity: 0.6,
  },
  continueBtnText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: "#ffffff",
  },
});

export default styles;
