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
    isHighContrast,
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

  const goToStep = (t: number) => {
    scrollRef.current?.scrollTo({ x: t * width, animated: true });
    setStep(t);
  };
  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const s = Math.round(e.nativeEvent.contentOffset.x / width);
    if (s !== step && s >= 0 && s < TOTAL_STEPS) setStep(s);
  };
  const handleNext = () =>
    step < TOTAL_STEPS - 1
      ? goToStep(step + 1)
      : onComplete(currentTask || undefined);

  const dotActiveColor = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#A78BFA"
      : "#3B5BDB";
  const dotInactiveColor = isHighContrast
    ? "#555555"
    : isDark
      ? "#444444"
      : "#D1D5DB";
  const btnStartBg = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#5B21B6"
      : "#3B5BDB";
  const btnStartText = isHighContrast ? "#000000" : "#FFFFFF";
  const btnContinueBg = isHighContrast
    ? "#000000"
    : isDark
      ? "#2A2A2A"
      : "#E5E7EB";
  const btnContinueBorder = isHighContrast ? "#FFFFFF" : "transparent";
  const btnContinueText = isHighContrast ? "#FFFFFF" : textPrimary;
  const inputBorderColor = isHighContrast ? "#FFFFFF" : "transparent";
  const inputTextColor = isHighContrast ? "#000000" : "#1A1A1A";

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
                borderWidth={isHighContrast ? 2 : 0}
                style={
                  isHighContrast ? { borderColor: inputBorderColor } : undefined
                }
              >
                <InputField
                  placeholder="Ex: Estudar por 30 minutos"
                  placeholderTextColor="#AAAAAA"
                  value={currentTask}
                  onChangeText={setCurrentTask}
                  returnKeyType="done"
                  onSubmitEditing={() => goToStep(2)}
                  fontSize="$sm"
                  style={{ color: inputTextColor }}
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
                      i === step ? dotActiveColor : dotInactiveColor,
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
              style={{ backgroundColor: btnStartBg }}
            >
              <Text
                fontSize="$md"
                fontWeight="$bold"
                style={{ color: btnStartText }}
              >
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
              style={{
                backgroundColor: btnContinueBg,
                borderWidth: isHighContrast ? 2 : 0,
                borderColor: btnContinueBorder,
              }}
            >
              <Text
                fontSize="$md"
                fontWeight="$semibold"
                style={{ color: btnContinueText }}
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
