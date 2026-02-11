import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <Text style={styles.text}>Página Home</Text>
      <BottomTabBar></BottomTabBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
