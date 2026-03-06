import { Box, HStack, Icon, Pressable, Text } from "@gluestack-ui/themed";
import { useThemeColors } from "@hooks/useThemeColors";
import { useSettings } from "@hooks/useSettings";
import { Settings } from "lucide-react-native";
import React from "react";

interface AppHeaderProps {
  focusMode: boolean;
  focusEnabled?: boolean;
  onToggleFocus?: () => void;
  pomodoroEnabled: boolean;
  pomodoroSeconds: number;
  pomodoroRunning: boolean;
  onTogglePomodoro: () => void;
  onOpenSettings: () => void;
}

export default function AppHeader({
  focusMode,
  focusEnabled,
  onToggleFocus,
  pomodoroEnabled,
  pomodoroSeconds,
  pomodoroRunning,
  onTogglePomodoro,
  onOpenSettings,
}: AppHeaderProps) {
  const { settings } = useSettings();
  const {
    headerBg,
    headerBorder,
    headerButtonBg,
    headerButtonBorder,
    textPrimary,
    textSecondary,
  } = useThemeColors();

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const buttonStyle = {
    backgroundColor: headerButtonBg,
    borderColor: headerButtonBorder,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  };

  return (
    <Box
      px="$4"
      py="$2"
      borderBottomWidth={1}
      style={{ backgroundColor: headerBg, borderBottomColor: headerBorder }}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={28}>🌞</Text>

        <HStack space="sm" alignItems="center">
          {/* Pomodoro */}
          {pomodoroEnabled && settings.productivity.pomodoroEnabled && (
            <Pressable
              onPress={onTogglePomodoro}
              borderRadius="$full"
              borderWidth={1}
              $pressed={{ opacity: 0.7 }}
              style={buttonStyle}
            >
              <HStack space="xs" alignItems="center">
                <Text fontSize="$sm">🍎</Text>
                <Text
                  fontSize="$sm"
                  fontWeight="$semibold"
                  style={{ color: textPrimary }}
                >
                  {formatTime(pomodoroSeconds)}
                </Text>
                <Text fontSize="$xs" style={{ color: textSecondary }}>
                  {pomodoroRunning ? "⏸" : "▶"}
                </Text>
              </HStack>
            </Pressable>
          )}

          {/* Modo foco */}
          {focusEnabled && settings.productivity.focusMode && (
            <Pressable
              onPress={onToggleFocus}
              borderRadius="$full"
              borderWidth={1}
              $pressed={{ opacity: 0.7 }}
              style={buttonStyle}
            >
              <HStack space="xs" alignItems="center">
                <Text fontSize="$xs" style={{ color: textSecondary }}>
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
            w={36}
            h={36}
            borderRadius="$full"
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            $pressed={{ opacity: 0.7 }}
            style={{
              backgroundColor: headerButtonBg,
              borderColor: headerButtonBorder,
            }}
          >
            <Icon as={Settings} size="sm" color="$textLight600" />
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}
