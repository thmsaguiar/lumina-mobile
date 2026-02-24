import { BoardProvider } from "@context/BoardContext";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import HomeScreen from "@screens/HomeScreen";
import SettingsScreen from "@screens/SettingsScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider } from "@context/SettingsContext";

type Screen = "onboarding" | "home" | "settings";

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [currentTask, setCurrentTask] = useState<string | undefined>(undefined);

  const handleOnboardingComplete = (task?: string) => {
    setCurrentTask(task);
    setScreen("home");
  };

  const handleOpenSettings = () => {
    setScreen("settings");
  };

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
            onOpenSettings={handleOpenSettings}
            pomodoroEnabled
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <SettingsProvider>
          <BoardProvider>{renderScreen()}</BoardProvider>
        </SettingsProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
