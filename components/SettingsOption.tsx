import {
  ChevronDownIcon,
  HStack,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Switch,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useThemeColors } from "@hooks/useThemeColors";
import { useTypography } from "@hooks/useTypography";
import React from "react";

type OptionVariant = "toggle" | "select";

interface SettingsOptionProps<T = string> {
  title: string;
  subtitle: string;
  variant?: OptionVariant;
  value: boolean | T;
  onChange: (value: boolean | T) => void;
  options?: { label: string; value: T }[];
}

export default function SettingsOption<
  T extends string | null | undefined = string,
>({
  title,
  subtitle,
  variant = "toggle",
  value,
  onChange,
  options = [],
}: Readonly<SettingsOptionProps<T>>) {
  const isToggle = variant === "toggle";
  const { textPrimary, textSecondary } = useThemeColors();
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
    <HStack justifyContent="space-between" alignItems="center" mb="$2">
      <VStack flex={1} mr="$3">
        <Text style={{fontSize: scaledFontSize(tokens.md),color: textPrimary}} >
          {title}
        </Text>
        <Text style={{fontSize: scaledFontSize(tokens.sm),color: textSecondary}}>
          {subtitle}
        </Text>
      </VStack>

      {isToggle ? (
        <Switch
          value={value as boolean}
          onValueChange={(v: boolean) => onChange(v)}
          alignSelf="center"
        />
      ) : (
        <Select
          selectedValue={value as T}
          onValueChange={(val) => onChange(val as T)}
          alignSelf="center"
        >
          <SelectTrigger w={150}>
            <SelectInput
            style={{fontSize: scaledFontSize(tokens.sm),}}
              value={
                value == null
                  ? ""
                  : String(
                      options.find((opt) => opt.value === value)?.label ?? "",
                    )
              }
            />
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>

          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              {options.map((opt) => (
                <SelectItem
                  key={String(opt.value)}
                  label={opt.label}
                  value={opt.value == null ? "" : String(opt.value)}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      )}
    </HStack>
  );
}
