import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
