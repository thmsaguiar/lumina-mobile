import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipos
export type FontSizeOption = "small" | "medium" | "large";

export type Settings = {
  cognitiveModes: {
    focus: boolean;
    clearReading: boolean;
    sensorySensitivity: boolean;
    lowAttention: boolean;
  };
  visual: {
    fontSize: FontSizeOption;
    visualAlerts: boolean;
    guidedSteps: boolean;
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

// Lista de opções com label e value
export const FONT_SIZE_OPTIONS: { label: string; value: FontSizeOption }[] = [
  { label: "Pequena", value: "small" },
  { label: "Média", value: "medium" },
  { label: "Grande", value: "large" },
];

// Configurações padrões
const defaultSettings: Settings = {
  cognitiveModes: {
    focus: false,
    clearReading: false,
    sensorySensitivity: false,
    lowAttention: false,
  },
  visual: {
    fontSize: "medium",
    visualAlerts: false,
    guidedSteps: false,
  },
  productivity: {
    focusMode: true,
    pomodoroEnabled: true,
  },
};

// Contexto
export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

// Provider
export const SettingsProvider = ({ children }: Props) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Carrega do AsyncStorage
  const loadSettings = useCallback(async () => {
    const stored = await AsyncStorage.getItem("settings");
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Atualiza parcialmente
  const updateSettings = useCallback(
    async (newSettings: Partial<Settings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings };
        AsyncStorage.setItem("settings", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  // Memoiza context
  const contextValue = useMemo(
    () => ({
      settings,
      updateSettings,
    }),
    [settings, updateSettings]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};