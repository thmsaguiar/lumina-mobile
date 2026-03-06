import { useSettings } from "@hooks/useSettings";

export function useThemeColors() {
  const { settings } = useSettings();
  const isDark = settings.visual.darkMode;

  return {
    isDark,

    // Backgrounds de tela
    screenBg: isDark ? "#181719" : "#F2F2F2",
    screenBgOnboarding: isDark ? "#181719" : "#F8F8F8",

    // Header
    headerBg: isDark ? "#1E1E1E" : "#F5F5F5",
    headerBorder: isDark ? "#333333" : "#E5E5E5",
    headerButtonBg: isDark ? "#2A2A2A" : "#FFFFFF",
    headerButtonBorder: isDark ? "#444444" : "#E5E5E5",

    // Textos
    textPrimary: isDark ? "#F5F5F5" : "#1A1A1A", // títulos principais
    textSecondary: isDark ? "#AAAAAA" : "#6B6B6B", // subtítulos / descrições
    textMuted: isDark ? "#777777" : "#9B9B9B", // textos muito secundários

    // Status bar
    statusBarStyle: (isDark ? "light-content" : "dark-content") as
      | "light-content"
      | "dark-content",
  };
}
