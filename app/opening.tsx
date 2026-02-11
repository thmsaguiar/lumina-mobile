import { Image } from "expo-image";
import {
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState, useRef } from "react";
import OpeningFooter from "../components/OpeningFooter";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  PlaypenSans_400Regular,
  PlaypenSans_600SemiBold,
} from "@expo-google-fonts/playpen-sans";
import { router } from "expo-router";

type StepKey = 1 | 2 | 3;

const steps: Record<
  StepKey,
  {
    title: string;
    subtitle: string;
    message: string;
  }
> = {
  1: {
    title: "Vamos te ajudar a focar no que importa",
    subtitle: "Organize suas tarefas e avance um passo de cada vez",
    message: "Este é apenas o começo!",
  },
  2: {
    title: "Conte-nos, qual atividade está trabalhando no momento?",
    subtitle: "",
    message: "Falta pouco!",
  },
  3: {
    title: "Tudo pronto!",
    subtitle: "O próximo passo te levará para a página principal do app.",
    message: "Seu progresso começa agora!",
  },
};

export default function Opening() {
  const { width } = Dimensions.get("window");

  const [currentStep, setCurrentStep] = useState<StepKey>(1);
  const [text, setText] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    PlaypenSans_400Regular,
    PlaypenSans_600SemiBold,
  });
  if (!fontsLoaded) return null;

  const { subtitle, message } = steps[currentStep];

  const animateStep = (nextStep: StepKey) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(nextStep);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleStep = (event: { nativeEvent: { pageX: number } }) => {
    const { pageX } = event.nativeEvent;
    const goingForward = pageX >= width / 2;
    const goingBack = pageX < width / 2;

    // Avançar
    if (goingForward) {
      if (currentStep === 2) {
        if (text.trim() === "") {
          Alert.alert(
            "Atenção",
            "Por favor, descreva a atividade ou clique em pular etapa.",
          );
          return;
        }
        Alert.alert(
          "Confirmação",
          "Deseja realmente avançar?",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Sim", onPress: () => animateStep(3) },
          ],
          { cancelable: true },
        );
      } else if (currentStep === 3) {
        goToHome();
      } else {
        animateStep(currentStep === 1 ? 2 : 3);
      }
    }

    // Voltar
    if (goingBack) {
      animateStep(currentStep > 1 ? ((currentStep - 1) as StepKey) : 1);
    }
  };

  const getTitle = () => {
    if (currentStep === 3 && text.trim() !== "") {
      return `${steps[currentStep].title} Vamos focar em ${text}!`;
    }
    return steps[currentStep].title;
  };

  const goToHome = () => {
    router.push("/home"); // Navegar para a Home
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={handleStep}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            style={styles.image}
            source={require("../assets/logo.png")}
            contentFit="cover"
            transition={1000}
          />

          <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
            <Text style={styles.title}>{getTitle()}</Text>

            {currentStep !== 2 && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}

            {currentStep === 2 && (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={setText}
                  value={text}
                  placeholder="Ex.: Estudar por 30 minutos"
                />
                {text.trim() === "" && (
                  <Text style={styles.skip} onPress={() => animateStep(3)}>
                    Pular etapa
                  </Text>
                )}
              </>
            )}
          </Animated.View>
          <OpeningFooter message={message} selectedStep={currentStep} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  apptitle: {
    color: "#2F4253",
    fontFamily: "PlaypenSans_600SemiBold",
    fontSize: 28,
    textTransform: "uppercase",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA",
    padding: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 132,
    height: 132,
  },
  centerContent: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    minWidth: "100%",
    maxWidth: "100%",
    height: 40,
    marginTop: 12,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#C9C9C9",
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
  skip: {
    textDecorationLine: "underline",
    marginTop: 10,
    marginBottom: 10,
  },
});
