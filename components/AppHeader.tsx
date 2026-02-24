import { Box, HStack, Icon, Pressable, Text } from "@gluestack-ui/themed";
import { Settings } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";

const POMODORO_DURATION = 25 * 60;

interface AppHeaderProps {
  focusMode: boolean;
  focusEnabled?: boolean;
  onToggleFocus?: () => void;
  pomodoroEnabled: boolean;
  onOpenSettings: () => void;
}

export default function AppHeader({
  focusMode,
  onToggleFocus,
  pomodoroEnabled,
  focusEnabled,
  onOpenSettings,
}: AppHeaderProps) {
  const [seconds, setSeconds] = useState(POMODORO_DURATION);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return POMODORO_DURATION;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <Box
      bg="$backgroundLight100"
      px="$4"
      py="$2"
      borderBottomWidth={1}
      borderBottomColor="$borderLight200"
    >
      <HStack alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Text fontSize={28}>🌞</Text>

        <HStack space="sm" alignItems="center">
          {/* Pomodoro */}
          {pomodoroEnabled && (
            <Pressable
              onPress={() => setRunning((r) => !r)}
              bg="$white"
              borderRadius="$full"
              px="$3"
              py="$1.5"
              borderWidth={1}
              borderColor="$borderLight200"
              $pressed={{ opacity: 0.7 }}
            >
              <HStack space="xs" alignItems="center">
                <Text fontSize="$sm">🍎</Text>
                <Text
                  fontSize="$sm"
                  fontWeight="$semibold"
                  color="$textLight800"
                >
                  {formatTime(seconds)}
                </Text>
                <Text fontSize="$xs" color="$textLight500">
                  {running ? "⏸" : "▶"}
                </Text>
              </HStack>
            </Pressable>
          )}

          {/* Modo foco */}
          {focusEnabled && (
            <Pressable
              onPress={onToggleFocus}
              bg="$white"
              borderRadius="$full"
              px="$3"
              py="$1.5"
              borderWidth={1}
              borderColor="$borderLight200"
              $pressed={{ opacity: 0.7 }}
            >
              <HStack space="xs" alignItems="center">
                <Text fontSize="$xs" color="$textLight600">
                  Modo foco:{" "}
                </Text>
                <Text
                  fontSize="$xs"
                  fontWeight="$bold"
                  color={focusMode ? "$success600" : "$error500"}
                >
                  {focusMode ? "ativado" : "desativado"}
                </Text>
              </HStack>
            </Pressable>
          )}
          
          {/* Settings */}
          <Pressable
            onPress={onOpenSettings}
            bg="$white"
            w={36}
            h={36}
            borderRadius="$full"
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            borderColor="$borderLight200"
            $pressed={{ opacity: 0.7 }}
          >
            <Icon as={Settings} size="sm" color="$textLight600" />
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}
