import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { useClearReading } from "@hooks/useClearReading";
import { useThemeColors } from "@hooks/useThemeColors";
import React from "react";

type SectionVariant = "primary" | "secondary";

interface SettingsSectionProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  variant?: SectionVariant;
}

export default function SettingsSection({
  title,
  subtitle,
  content,
  variant = "primary",
}: Readonly<SettingsSectionProps>) {
  const isPrimary = variant === "primary";
  const { textPrimary, textSecondary } = useThemeColors();
  const { isClearReading } = useClearReading();

  return (
    <VStack mb="$5">
      <HStack justifyContent="space-between" alignItems="flex-start" mb="$5">
        <VStack flex={1} mr="$3">
          <Text
            fontSize={isPrimary ? "$xl" : "$md"}
            fontWeight="$bold"
            mb="$0.5"
            style={{ color: textPrimary }}
          >
            {title}
          </Text>
          {!isClearReading && (
            <Text
              fontSize={isPrimary ? "$md" : "$sm"}
              lineHeight="$sm"
              style={{ color: textSecondary }}
            >
              {subtitle}
            </Text>
          )}
        </VStack>
      </HStack>
      {content}
    </VStack>
  );
}
