import { HStack, Text, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";

type SectionVariant = "primary" | "secondary";

interface SettingsSectionProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  variant?: SectionVariant
}

export default function SettingsSection({
  title,
  subtitle,
  content,
  variant = "primary"
}: Readonly<SettingsSectionProps>) {
  const isPrimary = variant === "primary";
  return (
    <>
      {/* Cabeçalho da seção */}
      <HStack justifyContent="space-between" alignItems="flex-start" mb="$5">
        <VStack flex={1} mr="$3">
          <Text
            fontSize={isPrimary ? "$xl" : "$md"}
            fontWeight="$bold"
            color="$textLight900"
            mb="$0.5"
          >
            {title}
          </Text>
          <Text fontSize={isPrimary ? "$md" : "$sm"} color="$textLight500" lineHeight="$sm">
            {subtitle}
          </Text>
        </VStack>
      </HStack>
      {content}
    </>
  );
}
