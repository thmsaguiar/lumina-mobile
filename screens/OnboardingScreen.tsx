import {
  Box,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
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
      style={{ flex: 1, backgroundColor: "#F8F8F8" }}
      edges={["top", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />

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
          {/* Step 0 — Boas-vindas */}
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
                color="$textLight900"
                textAlign="center"
                lineHeight="$2xl"
              >
                Vamos te ajudar a focar no que importa
              </Text>
              <Text
                fontSize="$md"
                color="$textLight600"
                textAlign="center"
                lineHeight="$lg"
              >
                Organize suas tarefas e avance um passo de cada vez
              </Text>
            </VStack>
          </Box>

          {/* Step 1 — Atividade atual */}
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
                color="$textLight900"
                textAlign="center"
                lineHeight="$2xl"
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
                  fontSize="$sm"
                />
              </Input>
            </VStack>
          </Box>

          {/* Step 2 — Confirmação */}
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
                color="$textLight900"
                textAlign="center"
                lineHeight="$2xl"
              >
                {currentTask
                  ? `Tudo pronto! Vamos focar em ${currentTask}!`
                  : "Tudo pronto! Vamos começar!"}
              </Text>
              <Text
                fontSize="$md"
                color="$textLight600"
                textAlign="center"
                lineHeight="$lg"
              >
                O próximo passo te levará para a página principal do{" "}
                {Platform.OS === "web" ? "site" : "app"}.
              </Text>
            </VStack>
          </Box>
        </ScrollView>

        <VStack alignItems="center" pb="$8" px="$8" space="sm">
          {/* Pular etapa */}
          {step === 1 && (
            <Pressable onPress={() => goToStep(2)} mb="$1">
              <Text
                fontSize="$sm"
                color="$textLight700"
                textDecorationLine="underline"
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
                  w={i === step ? "$5" : "$2.5"}
                  h="$2.5"
                  borderRadius="$full"
                  bg={i === step ? "$textLight800" : "$borderLight300"}
                />
              </Pressable>
            ))}
          </Box>

          {/* Label */}
          <Text
            fontSize="$xs"
            fontWeight="$bold"
            color="$textLight500"
            textTransform="uppercase"
            letterSpacing="$lg"
          >
            {stepLabels[step]}
          </Text>

          {/* Botão */}
          {step === TOTAL_STEPS - 1 ? (
            <Pressable
              onPress={handleNext}
              bg="$primary600"
              borderRadius="$xl"
              px="$12"
              py="$3.5"
              mt="$1"
              $pressed={{ opacity: 0.85 }}
            >
              <Text fontSize="$md" fontWeight="$bold" color="$white">
                Começar
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleNext}
              bg="$backgroundLight200"
              borderRadius="$xl"
              px="$12"
              py="$3.5"
              mt="$1"
              $pressed={{ opacity: 0.7 }}
            >
              <Text fontSize="$md" fontWeight="$semibold" color="$textLight700">
                Continuar →
              </Text>
            </Pressable>
          )}
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
