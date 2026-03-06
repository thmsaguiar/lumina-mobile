import {
  Box,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useThemeColors } from "@hooks/useThemeColors";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const TOTAL_STEPS = 3;

interface OnboardingScreenProps {
  onComplete: (currentTask?: string) => void;
}

export default function OnboardingScreen({
  onComplete,
}: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const {
    isDark,
    screenBgOnboarding,
    statusBarStyle,
    textPrimary,
    textSecondary,
  } = useThemeColors();

  const stepLabels = [
    "Apenas o começo!",
    "Falta pouco!",
    "Seu progresso começa agora!",
  ];

  const goToStep = (targetStep: number) => {
    scrollRef.current?.scrollTo({ x: targetStep * width, animated: true });
    setStep(targetStep);
  };

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const newStep = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newStep !== step && newStep >= 0 && newStep < TOTAL_STEPS) {
      setStep(newStep);
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      goToStep(step + 1);
    } else {
      onComplete(currentTask || undefined);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: screenBgOnboarding }}
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={screenBgOnboarding}
      />

      <Box alignItems="center" pt="$6" pb="$2">
        <Text fontSize={72}>🌞</Text>
      </Box>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
        >
          {/* Step 0 */}
          <Box
            width={width}
            flex={1}
            justifyContent="center"
            alignItems="center"
            px="$8"
          >
            <VStack space="sm" alignItems="center">
              <Text
                fontSize="$2xl"
                fontWeight="$bold"
                textAlign="center"
                lineHeight="$2xl"
                style={{ color: textPrimary }}
              >
                Vamos te ajudar a focar no que importa
              </Text>
              <Text
                fontSize="$md"
                textAlign="center"
                lineHeight="$lg"
                style={{ color: textSecondary }}
              >
                Organize suas tarefas e avance um passo de cada vez
              </Text>
            </VStack>
          </Box>

          {/* Step 1 */}
          <Box
            width={width}
            flex={1}
            justifyContent="center"
            alignItems="center"
            px="$8"
          >
            <VStack space="xl" alignItems="center" w="$full">
              <Text
                fontSize="$2xl"
                fontWeight="$bold"
                textAlign="center"
                lineHeight="$2xl"
                style={{ color: textPrimary }}
              >
                Conte-nos, qual atividade está trabalhando no momento?
              </Text>
              <Input
                bg="$backgroundLight200"
                borderRadius="$xl"
                w="$full"
                borderWidth={0}
              >
                <InputField
                  placeholder="Ex: Estudar por 30 minutos"
                  placeholderTextColor="#AAAAAA"
                  value={currentTask}
                  onChangeText={setCurrentTask}
                  returnKeyType="done"
                  onSubmitEditing={() => goToStep(2)}
                  style={{ color: "#1A1A1A" }}
                  fontSize="$sm"
                />
              </Input>
            </VStack>
          </Box>

          {/* Step 2 */}
          <Box
            width={width}
            flex={1}
            justifyContent="center"
            alignItems="center"
            px="$8"
          >
            <VStack space="sm" alignItems="center">
              <Text
                fontSize="$2xl"
                fontWeight="$bold"
                textAlign="center"
                lineHeight="$2xl"
                style={{ color: textPrimary }}
              >
                {currentTask
                  ? `Tudo pronto! Vamos focar em ${currentTask}!`
                  : "Tudo pronto! Vamos começar!"}
              </Text>
              <Text
                fontSize="$md"
                textAlign="center"
                lineHeight="$lg"
                style={{ color: textSecondary }}
              >
                O próximo passo te levará para a página principal do{" "}
                {Platform.OS === "web" ? "site" : "app"}.
              </Text>
            </VStack>
          </Box>
        </ScrollView>

        <VStack alignItems="center" pb="$8" px="$8" space="sm">
          {step === 1 && (
            <Pressable onPress={() => goToStep(2)} mb="$1">
              <Text
                fontSize="$sm"
                color="$textLight700"
                textDecorationLine="underline"
                style={{ color: textSecondary }}
              >
                Pular etapa
              </Text>
            </Pressable>
          )}

          {/* Dots */}
          <Box flexDirection="row" style={{ gap: 8 }}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <Pressable key={i} onPress={() => goToStep(i)}>
                <Box
                  h="$2.5"
                  borderRadius="$full"
                  style={{
                    width: i === step ? 24 : 10,
                    backgroundColor:
                      i === step
                        ? isDark
                          ? "#A78BFA"
                          : "#3B5BDB"
                        : isDark
                          ? "#444444"
                          : "#D1D5DB",
                  }}
                />
              </Pressable>
            ))}
          </Box>

          <Text
            fontSize="$xs"
            fontWeight="$bold"
            textTransform="uppercase"
            letterSpacing="$lg"
            style={{ color: textSecondary }}
          >
            {stepLabels[step]}
          </Text>

          {step === TOTAL_STEPS - 1 ? (
            <Pressable
              onPress={handleNext}
              borderRadius="$xl"
              px="$12"
              py="$3.5"
              mt="$1"
              $pressed={{ opacity: 0.85 }}
              style={{ backgroundColor: isDark ? "#5B21B6" : "#3B5BDB" }}
            >
              <Text fontSize="$md" fontWeight="$bold" color="$white">
                Começar
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleNext}
              borderRadius="$xl"
              px="$12"
              py="$3.5"
              mt="$1"
              $pressed={{ opacity: 0.7 }}
              style={{ backgroundColor: isDark ? "#2A2A2A" : "#E5E7EB" }}
            >
              <Text
                fontSize="$md"
                fontWeight="$semibold"
                style={{ color: textPrimary }}
              >
                Continuar →
              </Text>
            </Pressable>
          )}
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
