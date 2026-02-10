import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 
    justifyContent: "center", 
    alignItems: "center",     
    backgroundColor: "#FAFAFA",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
