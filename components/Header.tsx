import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        style={styles.image}
        source={require("../assets/logo.png")}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
    backgroundColor: "#D9D9D9",
    height: 55,
    width: "100%",
    justifyContent: "center",
    padding: 12,
    
  },
  image: {
    width: 49,
    height: 49,
  },
});
