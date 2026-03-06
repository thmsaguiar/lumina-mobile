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

  return (
    <HStack justifyContent="space-between" alignItems="center" mb="$2">
      <VStack flex={1} mr="$3">
        <Text fontSize="$md" style={{ color: textPrimary }}>
          {title}
        </Text>
        <Text fontSize="$sm" style={{ color: textSecondary }}>
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
