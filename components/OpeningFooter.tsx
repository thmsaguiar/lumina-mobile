import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type FooterProps = {
  message: string;
  selectedStep: number;
};

export default function OpeningFooter({
  message,
  selectedStep,
}: Readonly<FooterProps>) {
  return (
    <View style={styles.footer}>
      <View style={styles.progressBar}>
        <MaterialIcons
          name="circle"
          size={10}
          color={selectedStep === 1 ? "#595959" : "#D9D9D9"}
        />
        <MaterialIcons
          name="circle"
          size={10}
          color={selectedStep === 2 ? "#595959" : "#D9D9D9"}
        />
        <MaterialIcons
          name="circle"
          size={10}
          color={selectedStep === 3 ? "#595959" : "#D9D9D9"}
        />
      </View>
      <Text style={styles.footerText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    textAlign: "center",
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  footer: {
    gap: 10,
  },
});
