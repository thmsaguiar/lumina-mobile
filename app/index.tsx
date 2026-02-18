import { BoardProvider } from "@context/BoardContext";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import HomeScreen from "@screens/HomeScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


type Screen = "onboarding" | "home";

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [currentTask, setCurrentTask] = useState<string | undefined>(undefined);

  const handleOnboardingComplete = (task?: string) => {
    setCurrentTask(task);
    setScreen("home");
  };

  const handleOpenSettings = () => {
    // TODO: navegar para SettingsScreen
    console.log("Settings");
  };

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <BoardProvider>
          {screen === "onboarding" ? (
            <OnboardingScreen onComplete={handleOnboardingComplete} />
          ) : (
            <HomeScreen
              currentTask={currentTask}
              onOpenSettings={handleOpenSettings}
              pomodoroEnabled
            />
          )}
        </BoardProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}