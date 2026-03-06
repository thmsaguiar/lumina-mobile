import { BoardProvider } from "@context/BoardContext";
import { SettingsProvider } from "@context/SettingsContext";
import { useSettings } from "@hooks/useSettings";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import HomeScreen from "@screens/HomeScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import SettingsScreen from "@screens/SettingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const CURRENT_TASK_KEY = "@lumina:currentTask";

type Screen = "onboarding" | "home" | "settings";

function AppContent() {
  const { settings } = useSettings();
  const [screen, setScreen] = useState<Screen | null>(null);
  const [currentTask, setCurrentTask] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function bootstrap() {
      try {
        const saved = await AsyncStorage.getItem(CURRENT_TASK_KEY);
        console.log(saved);
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

  if (screen === null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: settings.visual.darkMode ? "#181719" : "#F8F8F8",
        }}
      >
        <ActivityIndicator
          size="large"
          color={settings.visual.darkMode ? "#A78BFA" : "#3B5BDB"}
        />
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
            pomodoroEnabled
          />
        );
    }
  };

  return (
    <GluestackUIProvider
      config={config}
      colorMode={settings.visual.darkMode ? "dark" : "light"}
    >
      <BoardProvider>{renderScreen()}</BoardProvider>
    </GluestackUIProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
