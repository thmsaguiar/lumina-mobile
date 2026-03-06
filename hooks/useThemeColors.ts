import { useSettings } from "@hooks/useSettings";

export function useThemeColors() {
  const { settings } = useSettings();
  const isDark = settings.visual.darkMode;
  const isHighContrast = settings.visual.highContrast;

  // ── Alto contraste: fundo preto puro, texto/bordas brancos ─────────────────
  if (isHighContrast) {
    return {
      isDark: true,
      isHighContrast: true,

      screenBg: "#000000",
      screenBgOnboarding: "#000000",

      headerBg: "#000000",
      headerBorder: "#FFFFFF",
      headerButtonBg: "#000000",
      headerButtonBorder: "#FFFFFF",

      textPrimary: "#FFFFFF",
      textSecondary: "#FFFFFF",
      textMuted: "#CCCCCC",

      statusBarStyle: "light-content" as "dark-content" | "light-content",
    };
  }

  // ── Dark mode ───────────────────────────────────────────────────────────────
  if (isDark) {
    return {
      isDark: true,
      isHighContrast: false,

      screenBg: "#181719",
      screenBgOnboarding: "#181719",

      headerBg: "#1E1E1E",
      headerBorder: "#333333",
      headerButtonBg: "#2A2A2A",
      headerButtonBorder: "#444444",

      textPrimary: "#F5F5F5",
      textSecondary: "#AAAAAA",
      textMuted: "#777777",

      statusBarStyle: "light-content" as "dark-content" | "light-content",
    };
  }

  // ── Light mode (padrão) ─────────────────────────────────────────────────────
  return {
    isDark: false,
    isHighContrast: false,

    screenBg: "#F2F2F2",
    screenBgOnboarding: "#F8F8F8",

    headerBg: "#F5F5F5",
    headerBorder: "#E5E5E5",
    headerButtonBg: "#FFFFFF",
    headerButtonBorder: "#E5E5E5",

    textPrimary: "#1A1A1A",
    textSecondary: "#6B6B6B",
    textMuted: "#9B9B9B",

    statusBarStyle: "dark-content" as "dark-content" | "light-content",
  };
}
