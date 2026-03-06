import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type FontSizeOption = "small" | "medium" | "large";

export type Settings = {
  cognitiveModes: {
    clearReading: boolean;
    lowAttention: boolean;
  };
  visual: {
    fontSize: FontSizeOption;
    darkMode: boolean;
    guidedSteps: boolean;
    highContrast: boolean;
  };
  productivity: {
    focusMode: boolean;
    pomodoroEnabled: boolean;
  };
};

export type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
};

export const FONT_SIZE_OPTIONS: { label: string; value: FontSizeOption }[] = [
  { label: "Pequena", value: "small" },
  { label: "Média", value: "medium" },
  { label: "Grande", value: "large" },
];

const defaultSettings: Settings = {
  cognitiveModes: {
    clearReading: false,
    lowAttention: false,
  },
  visual: {
    fontSize: "medium",
    darkMode: false,
    guidedSteps: false,
    highContrast: false,
  },
  productivity: {
    focusMode: true,
    pomodoroEnabled: true,
  },
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const SettingsProvider = ({ children }: Props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const loadSettings = useCallback(async () => {
    const stored = await AsyncStorage.getItem("settings");
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      AsyncStorage.setItem("settings", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      settings,
      updateSettings,
    }),
    [settings, updateSettings],
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
