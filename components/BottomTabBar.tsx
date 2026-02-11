import { Alert, StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState } from "react";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function BottomTabBar() {
  const [focus, setFocus] = useState(false);
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          handleSwitch();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSwitch = () => {
    setIsRunning(false);
    setIsFocus((prev) => !prev);
    setSeconds(isFocus ? BREAK_TIME : FOCUS_TIME);
  };

  const handleResetTimer = () => {
    if (isFocus && seconds === FOCUS_TIME) return;

    Alert.alert(
      "Reiniciar timer",
      "Deseja reiniciar o tempo atual?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            setIsRunning(false);
            setSeconds(isFocus ? FOCUS_TIME : BREAK_TIME);
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <PrimaryButton
        title={formatTime(seconds)}
        variant="pomo"
        onPress={() => setIsRunning((prev) => !prev)}
        onLongPress={handleResetTimer}
        icon={isRunning ? "pause" : "play-arrow"}
      ></PrimaryButton>
      <PrimaryButton
        title={"Modo foco: "}
        variant="focus"
        active={focus}
        onPress={() => setFocus(!focus)}
      ></PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingBottom: 10,
  },
});
