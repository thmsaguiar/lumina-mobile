import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { useClearReading } from "@hooks/useClearReading";
import { useThemeColors } from "@hooks/useThemeColors";
import { useTypography } from "@hooks/useTypography";
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

  return (
    <VStack mb="$5">
      <HStack justifyContent="space-between" alignItems="flex-start" mb="$5">
        <VStack flex={1} mr="$3">
          <Text
            style={{
              fontSize: isPrimary
                ? scaledFontSize(tokens.xl)
                : scaledFontSize(tokens.md),
              color: textPrimary,
            }}
            fontWeight="$bold"
            mb="$0.5"
          >
            {title}
          </Text>
          {!isClearReading && (
            <Text
              lineHeight="$sm"
              style={{
                fontSize: isPrimary
                  ? scaledFontSize(tokens.md)
                  : scaledFontSize(tokens.sm),
                color: textSecondary,
              }}
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
