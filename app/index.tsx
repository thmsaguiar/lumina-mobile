import { BoardProvider } from "@context/BoardContext";
import { SettingsProvider } from "@context/SettingsContext";
import { useSettings } from "@hooks/useSettings";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import HomeScreen from "@screens/HomeScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import SettingsScreen from "@screens/SettingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TypographyProvider } from "@context/TypographyContext";

const CURRENT_TASK_KEY = "@lumina:currentTask";
const POMODORO_DURATION = 25 * 60;

type Screen = "onboarding" | "home" | "settings";

function AppContent() {
  const { settings } = useSettings();
  const isDark = settings.visual.darkMode;
  const isHighContrast = settings.visual.highContrast;

  const colorMode = isDark || isHighContrast ? "dark" : "light";

  const [screen, setScreen] = useState<Screen | null>(null);
  const [currentTask, setCurrentTask] = useState<string | undefined>(undefined);
  const [focusMode, setFocusMode] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(POMODORO_DURATION);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (pomodoroRunning) {
      intervalRef.current = setInterval(() => {
        setPomodoroSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setPomodoroRunning(false);
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
  }, [pomodoroRunning]);

  useEffect(() => {
    async function bootstrap() {
      try {
        const saved = await AsyncStorage.getItem(CURRENT_TASK_KEY);
        if (saved && saved.trim().length > 0) {
          setCurrentTask(saved);
          setScreen("home");
        } else {
          setScreen("onboarding");
        }
      } catch {
        setScreen("onboarding");
      }
    }
    bootstrap();
  }, []);

  async function persistCurrentTask(task: string | undefined) {
    try {
      if (task && task.trim().length > 0) {
        await AsyncStorage.setItem(CURRENT_TASK_KEY, task);
      } else {
        await AsyncStorage.removeItem(CURRENT_TASK_KEY);
      }
    } catch (e) {
      console.warn("Erro ao salvar atividade atual:", e);
    }
  }

  const handleOnboardingComplete = async (task?: string) => {
    setCurrentTask(task);
    await persistCurrentTask(task);
    setScreen("home");
  };

  const handleClearCurrentTask = async () => {
    setCurrentTask(undefined);
    await persistCurrentTask(undefined);
  };

  const loadingBg = isHighContrast ? "#000000" : isDark ? "#181719" : "#F8F8F8";
  const loadingColor = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#A78BFA"
      : "#3B5BDB";

  if (screen === null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: loadingBg,
        }}
      >
        <ActivityIndicator size="large" color={loadingColor} />
      </View>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "onboarding":
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case "settings":
        return <SettingsScreen handleClose={() => setScreen("home")} />;
      case "home":
        return (
          <HomeScreen
            currentTask={currentTask}
            onOpenSettings={() => setScreen("settings")}
            onClearCurrentTask={handleClearCurrentTask}
            focusMode={focusMode}
            onToggleFocus={() => setFocusMode((f) => !f)}
            pomodoroSeconds={pomodoroSeconds}
            pomodoroRunning={pomodoroRunning}
            onTogglePomodoro={() => setPomodoroRunning((r) => !r)}
            pomodoroEnabled
          />
        );
    }
  };

  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <BoardProvider>{renderScreen()}</BoardProvider>
    </GluestackUIProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <TypographyProvider>
          <AppContent />
        </TypographyProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
