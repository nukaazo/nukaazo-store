import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertType = "info" | "success" | "warning" | "error" | "confirm";

export interface AlertButton {
  text: string;
  onPress?: () => void;
  /** Default: "default". "cancel" renders as a ghost button, "destructive" renders red. */
  style?: "default" | "cancel" | "destructive";
}

interface AlertOptions {
  type?: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  /** If true, tapping the backdrop dismisses the modal */
  dismissible?: boolean;
}

interface AlertState extends AlertOptions {
  visible: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppAlertContextValue {
  show: (options: AlertOptions) => void;
  hide: () => void;
}

const AppAlertContext = createContext<AppAlertContextValue | null>(null);

// ─── Icon + Color map per type ────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  AlertType,
  { icon: keyof typeof Ionicons.glyphMap; iconColor: string; iconBg: string; accentBorder: string }
> = {
  info: {
    icon: "information-circle",
    iconColor: "#0284c7",
    iconBg: "#e0f2fe",
    accentBorder: "#bae6fd",
  },
  success: {
    icon: "checkmark-circle",
    iconColor: colors.progressGreen,
    iconBg: "#ecfdf5",
    accentBorder: "#a7f3d0",
  },
  warning: {
    icon: "warning",
    iconColor: "#d97706",
    iconBg: "#fffbeb",
    accentBorder: "#fde68a",
  },
  error: {
    icon: "close-circle",
    iconColor: "#dc2626",
    iconBg: "#fef2f2",
    accentBorder: "#fecaca",
  },
  confirm: {
    icon: "help-circle",
    iconColor: colors.primary,
    iconBg: colors.orangeTint,
    accentBorder: "rgba(232, 92, 28, 0.25)",
  },
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AppAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    title: "",
    type: "info",
  });

  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const show = useCallback((options: AlertOptions) => {
    setAlertState({ ...options, visible: true });
    scaleAnim.setValue(0.88);
    opacityAnim.setValue(0);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const hide = useCallback(() => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 130,
      useNativeDriver: true,
    }).start(() => setAlertState((prev) => ({ ...prev, visible: false })));
  }, [opacityAnim]);

  const handleButtonPress = (btn: AlertButton) => {
    hide();
    setTimeout(() => btn.onPress?.(), 160);
  };

  const { type = "info", title, message, buttons, dismissible = true } = alertState;
  const config = TYPE_CONFIG[type];

  const resolvedButtons: AlertButton[] = buttons && buttons.length > 0 ? buttons : [{ text: "OK" }];

  return (
    <AppAlertContext.Provider value={{ show, hide }}>
      {children}
      <Modal
        visible={alertState.visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={dismissible ? hide : undefined}
      >
        <Pressable
          style={modalStyles.backdrop}
          onPress={dismissible ? hide : undefined}
        >
          <Animated.View
            style={[
              modalStyles.card,
              { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
            ]}
            // Prevent backdrop tap from propagating through the card
          >
            <Pressable>
              {/* Icon */}
              <View style={[modalStyles.iconCircle, { backgroundColor: config.iconBg, borderColor: config.accentBorder }]}>
                <Ionicons name={config.icon} size={28} color={config.iconColor} />
              </View>

              {/* Title */}
              <Text style={modalStyles.title}>{title}</Text>

              {/* Message */}
              {message ? <Text style={modalStyles.message}>{message}</Text> : null}

              {/* Buttons */}
              <View
                style={[
                  modalStyles.buttonsRow,
                  resolvedButtons.length === 1 && modalStyles.buttonsSingle,
                ]}
              >
                {resolvedButtons.map((btn, i) => {
                  const isCancel = btn.style === "cancel";
                  const isDestructive = btn.style === "destructive";
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleButtonPress(btn)}
                      activeOpacity={0.8}
                      style={[
                        modalStyles.button,
                        resolvedButtons.length === 1 && modalStyles.buttonFull,
                        isCancel && modalStyles.buttonCancel,
                        isDestructive && modalStyles.buttonDestructive,
                        !isCancel && !isDestructive && { backgroundColor: config.iconColor },
                      ]}
                    >
                      <Text
                        style={[
                          modalStyles.buttonText,
                          isCancel && modalStyles.buttonTextCancel,
                          isDestructive && modalStyles.buttonTextDestructive,
                        ]}
                      >
                        {btn.text}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </AppAlertContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAppAlert() {
  const ctx = useContext(AppAlertContext);
  if (!ctx) throw new Error("useAppAlert must be used inside <AppAlertProvider>");
  return ctx;
}

/**
 * Convenience singleton — use this in non-React contexts (handlers, services).
 * Must call `initAppAlert(show)` once at app root after mounting.
 */
let _globalShow: ((opts: AlertOptions) => void) | null = null;
let _globalHide: (() => void) | null = null;

export function initAppAlert(show: (opts: AlertOptions) => void, hide: () => void) {
  _globalShow = show;
  _globalHide = hide;
}

/** Drop-in replacement for `Alert.alert`. Works outside React components. */
export const appAlert = {
  show(options: AlertOptions) {
    _globalShow?.(options);
  },
  hide() {
    _globalHide?.();
  },
  /** Simple 1-button info/success/error alert */
  simple(title: string, message?: string, type: AlertType = "info", onDismiss?: () => void) {
    _globalShow?.({
      type,
      title,
      message,
      buttons: [{ text: "OK", onPress: onDismiss }],
    });
  },
  /** 2-button confirm / action alert */
  confirm(
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText = "Confirm",
    cancelText = "Cancel"
  ) {
    _globalShow?.({
      type: "confirm",
      title,
      message,
      dismissible: true,
      buttons: [
        { text: cancelText, style: "cancel" },
        { text: confirmText, onPress: onConfirm },
      ],
    });
  },
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: "center",
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: 14,
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
    color: "#18181b",
    textAlign: "center",
    marginBottom: 6,
  },
  message: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    color: "#52525b",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginTop: 4,
  },
  buttonsSingle: {
    justifyContent: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFull: {
    flex: 1,
  },
  buttonCancel: {
    backgroundColor: "#f4f4f6",
  },
  buttonDestructive: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  buttonText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 14,
    color: "#ffffff",
  },
  buttonTextCancel: {
    color: "#52525b",
  },
  buttonTextDestructive: {
    color: "#dc2626",
  },
});

export default AppAlertProvider;
