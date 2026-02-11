import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IconName = keyof typeof MaterialIcons.glyphMap;

type ButtonProps = {
  title: string;
  variant?: "pomo" | "focus";
  active?: boolean;
  icon?: IconName;
  onPress?: () => void;
  onLongPress?: () => void;
};

export default function PrimaryButton({
  title,
  variant,
  active = false,
  icon,
  onPress,
  onLongPress,
}: Readonly<ButtonProps>) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {variant === "pomo" && (
        <>
          <Text style={styles.emoji}>🍎</Text>
          <Text style={styles.text}>{title}</Text>
          {icon && <MaterialIcons name={icon} size={18} color="#595959" />}
        </>
      )}

      {variant === "focus" && (
        <View style={styles.focusContainer}>
          <Text style={styles.text}>{title}</Text>
          <Text style={active ? styles.active : styles.inactive}>
            {active ? "ativado" : "desativado"}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 50,
    backgroundColor: "#a9aaaa59",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,

    // Android shadow
    elevation: 6,

    minHeight: 42,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  emoji: {
    fontSize: 16,
  },
  focusContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  active: {
    color: "#739C82",
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  inactive: {
    color: "#EF4D3C",
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
});
