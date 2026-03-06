import AppHeader from "@components/AppHeader";
import SettingsOption from "@components/SettingsOption";
import { FONT_SIZE_OPTIONS, FontSizeOption } from "@context/SettingsContext";
import SettingsSection from "@components/SettingsSection";
import { ScrollView } from "@gluestack-ui/themed";
import { useSettings } from "@hooks/useSettings";
import { useThemeColors } from "@hooks/useThemeColors";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsScreenProps {
  handleClose: () => void;
}

export default function SettingsScreen({
  handleClose,
}: Readonly<SettingsScreenProps>) {
  const { settings, updateSettings } = useSettings();
  const { screenBg, statusBarStyle } = useThemeColors();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: screenBg }}
      edges={["top"]}
    >
      <StatusBar barStyle={statusBarStyle} backgroundColor={screenBg} />

      <AppHeader
        focusMode={false}
        pomodoroEnabled={false}
        pomodoroSeconds={0}
        pomodoroRunning={false}
        onTogglePomodoro={() => {}}
        onOpenSettings={handleClose}
        focusEnabled={false}
      />

      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection
          title="Configurações"
          subtitle="Use esta página para ajustar o aplicativo do jeito que funciona melhor para você."
          content={
            <>
              <SettingsSection
                title="Modos Cognitivos"
                subtitle="Escolha modos já personalizados."
                variant="secondary"
                content={
                  <>
                    <SettingsOption
                      title="Leitura Clara"
                      subtitle="Esconde distrações e simplifica a interface."
                      variant="toggle"
                      value={settings.cognitiveModes.clearReading}
                      onChange={(val) =>
                        updateSettings({
                          cognitiveModes: {
                            ...settings.cognitiveModes,
                            clearReading: val as boolean,
                          },
                        })
                      }
                    />
                    <SettingsOption
                      title="Baixa Atenção"
                      subtitle="Texto maior e frases curtas."
                      variant="toggle"
                      value={settings.cognitiveModes.lowAttention}
                      onChange={(val) =>
                        updateSettings({
                          cognitiveModes: {
                            ...settings.cognitiveModes,
                            lowAttention: val as boolean,
                          },
                        })
                      }
                    />
                  </>
                }
              />
              <SettingsSection
                title="Personalizações Visuais"
                subtitle="Algumas configurações extras que podem melhorar sua experiência."
                variant="secondary"
                content={
                  <>
                    <SettingsOption
                      title="Tamanho da fonte"
                      subtitle="Escolha entre os tamanhos disponíveis para deixar a leitura mais confortável."
                      variant="select"
                      value={settings.visual.fontSize}
                      onChange={(val) =>
                        updateSettings({
                          visual: {
                            ...settings.visual,
                            fontSize: val as FontSizeOption,
                          },
                        })
                      }
                      options={FONT_SIZE_OPTIONS.map((s) => ({
                        label: s.label,
                        value: s.value,
                      }))}
                    />
                    <SettingsOption
                      title="Modo Escuro"
                      subtitle="Minimiza o cansaço visual ao suavizar o brilho da tela."
                      variant="toggle"
                      value={settings.visual.darkMode}
                      onChange={(val) =>
                        updateSettings({
                          visual: {
                            ...settings.visual,
                            darkMode: val as boolean,
                          },
                        })
                      }
                    />
                    <SettingsOption
                      title="Alto Contraste"
                      subtitle="Amplia a diferença entre cores e textos, facilitando a leitura."
                      variant="toggle"
                      value={settings.visual.highContrast}
                      onChange={(val) =>
                        updateSettings({
                          visual: {
                            ...settings.visual,
                            highContrast: val as boolean,
                          },
                        })
                      }
                    />
                    <SettingsOption
                      title="Passos guiados"
                      subtitle="Apresenta dicas para ajudar você a entender cada ação dentro do app."
                      variant="toggle"
                      value={settings.visual.guidedSteps}
                      onChange={(val) =>
                        updateSettings({
                          visual: {
                            ...settings.visual,
                            guidedSteps: val as boolean,
                          },
                        })
                      }
                    />
                  </>
                }
              />
              <SettingsSection
                title="Foco e Produtividade"
                subtitle="Configurações para ajudar você a manter a concentração e organizar melhor seu tempo."
                variant="secondary"
                content={
                  <>
                    <SettingsOption
                      title="Modo Foco"
                      subtitle="Reduz distrações visuais para que você se concentre melhor."
                      variant="toggle"
                      value={settings.productivity.focusMode}
                      onChange={(val) =>
                        updateSettings({
                          productivity: {
                            ...settings.productivity,
                            focusMode: val as boolean,
                          },
                        })
                      }
                    />
                    <SettingsOption
                      title="Timer Pomodoro"
                      subtitle="Organiza seu tempo em ciclos de trabalho e pausa."
                      variant="toggle"
                      value={settings.productivity.pomodoroEnabled}
                      onChange={(val) =>
                        updateSettings({
                          productivity: {
                            ...settings.productivity,
                            pomodoroEnabled: val as boolean,
                          },
                        })
                      }
                    />
                  </>
                }
              />
            </>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
