import { Box, HStack, Icon, Pressable, Text } from "@gluestack-ui/themed";
import { useThemeColors } from "@hooks/useThemeColors";
import { useSettings } from "@hooks/useSettings";
import { Settings } from "lucide-react-native";
import React from "react";
import { useTypography } from "@hooks/useTypography";

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
    isHighContrast,
    headerBg,
    headerBorder,
    headerButtonBg,
    headerButtonBorder,
    textPrimary,
    textSecondary,
  } = useThemeColors();
  const { scaledFontSize } = useTypography();

  // Mapeamento simples de tokens
  const tokens = {
    custom: 10,
    sm: 14,
    md: 16,
    xs: 12,
    lg: 18,
    xl: 20,
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const buttonStyle = {
    backgroundColor: headerButtonBg,
    borderColor: headerButtonBorder,
    borderWidth: isHighContrast ? 2 : 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  };

  const focusStatusColor = isHighContrast
    ? focusMode
      ? "#00FF00"
      : "#FF4444"
    : focusMode
      ? "#16a34a"
      : "#dc2626";

  return (
    <Box
      px="$4"
      py="$2"
      borderBottomWidth={isHighContrast ? 2 : 1}
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
              $pressed={{ opacity: 0.7 }}
              style={buttonStyle}
            >
              <HStack space="xs" alignItems="center">
                <Text fontSize="$sm">🍎</Text>
                <Text
                  fontWeight="$semibold"
                  style={{ fontSize: scaledFontSize(tokens.xs), color: textPrimary }}
                >
                  {formatTime(pomodoroSeconds)}
                </Text>
                <Text style={{ fontSize: scaledFontSize(tokens.xs), color: textSecondary }}>
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
              $pressed={{ opacity: 0.7 }}
              style={buttonStyle}
            >
              <HStack space="xs" alignItems="center">
                <Text style={{ fontSize: scaledFontSize(tokens.xs), color: textSecondary }}>
                  Foco:{" "}
                </Text>
                <Text
                  fontWeight="$bold"
                  style={{ fontSize: scaledFontSize(tokens.xs), color: focusStatusColor }}
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
            $pressed={{ opacity: 0.7 }}
            style={{
              backgroundColor: headerButtonBg,
              borderColor: headerButtonBorder,
              borderWidth: isHighContrast ? 2 : 1,
            }}
          >
            <Icon
              as={Settings}
              size="sm"
              color={isHighContrast ? "$white" : "$textLight600"}
            />
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}
