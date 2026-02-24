import AppHeader from "@components/AppHeader";
import SettingsOption from "@components/SettingsOption";
import { FONT_SIZE_OPTIONS, FontSizeOption } from "@context/SettingsContext";
import SettingsSection from "@components/SettingsSection";
import { ScrollView } from "@gluestack-ui/themed";
import { useSettings } from "@hooks/useSettings";
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
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F2F2F2" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Header */}
      <AppHeader
        focusMode={false}
        pomodoroEnabled={false}
        onOpenSettings={handleClose}
        focusEnabled={false}
      />

      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho da página */}
        <SettingsSection
          title={"Configurações"}
          subtitle={
            "Use esta página para ajustar o aplicativo do jeito que funciona melhor para você."
          }
          content={
            <>
              {/* Modos Cognitivos */}
              <SettingsSection
                title={"Modos Cognitivos"}
                subtitle={"Escolha modos já personalizados."}
                variant="secondary"
                content={
                  <>
                    <SettingsOption
                      title={"Foco"}
                      subtitle={
                        "Modo tarefa única, notificações bloqueadas, destaque visual e lembretes objetivos."
                      }
                      variant="toggle"
                      value={settings.cognitiveModes.focus}
                      onChange={(val) =>
                        updateSettings({
                          cognitiveModes: {
                            ...settings.cognitiveModes,
                            focus: val as boolean,
                          },
                        })
                      }
                    />
                    <SettingsOption
                      title={"Leitura Clara"}
                      subtitle={
                        "Indicação de progresso, confirmação antes de ações críticas e  passos numerados."
                      }
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
                      title={"Sensibilidade Sensorial"}
                      subtitle={"Modo escuro suave e sem flashes ou efeitos."}
                      variant="toggle"
                      value={settings.cognitiveModes.sensorySensitivity}
                      onChange={(val) =>
                        updateSettings({
                          cognitiveModes: {
                            ...settings.cognitiveModes,
                            sensorySensitivity: val as boolean,
                          },
                        })
                      }
                    />
                    <SettingsOption
                      title={"Baixa Atenção"}
                      subtitle={"Texto maior e frases curtas."}
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
              {/* Personalizações Visuais */}
              <SettingsSection
                title={"Personalizações Visuais"}
                subtitle={
                  "Algumas configurações extras que podem melhorar sua experiência."
                }
                variant="secondary"
                content={
                  <>
                    <SettingsOption
                      title={"Tamanho da fonte"}
                      subtitle={
                        "Aqui você pode escolher entre os tamanhos de letra disponíveis para deixar a leitura mais confortável para você."
                      }
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
                      options={FONT_SIZE_OPTIONS.map((size) => ({
                        label: size.label,
                        value: size.value,
                      }))}
                    />
                    <SettingsOption
                      title={"Alertas visuais"}
                      subtitle={
                        "Com essa opção ativa, você receberá alertas visuais em vez de sonoros, facilitando a percepção de notificações mesmo em ambientes silenciosos."
                      }
                      variant="toggle"
                      value={settings.visual.visualAlerts}
                      onChange={(val) =>
                        updateSettings({
                          visual: {
                            ...settings.visual,
                            visualAlerts: val as boolean,
                          },
                        })
                      }
                    />
                    <SettingsOption
                      title={"Passos guiados"}
                      subtitle={
                        "Ao ativar essa opção, serão apresentados passo a passo, ajudando você a entender melhor cada ação dentro do site evitando confusões durante o uso."
                      }
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
              {/* Foco e Produtividade */}
              <SettingsSection
                title={"Foco e Produtividade"}
                subtitle={
                  "Configurações pensadas para ajudar você a manter a concentração, organizar melhor seu tempo e reduzir distrações durante as atividades.."
                }
                variant="secondary"
                content={
                  <>
                    <SettingsOption
                      title="Modo Foco"
                      subtitle="Com o modo foco ativado, distrações visuais são reduzidas para que você consiga se concentrar melhor na atividade que está realizando."
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
                      title={"Timer pomodoro"}
                      subtitle={
                        "Ao ativar o timer pomodoro, você organiza seu tempo em ciclos de trabalho e pausa, ajudando a manter o foco e evitar o cansaço mental."
                      }
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
