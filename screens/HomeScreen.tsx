import AppHeader from "@components/AppHeader";
import ListColumn from "@components/ListColumn";
import ListModal from "@components/ListModal";
import TaskModal from "@components/TaskModal";
import { useBoard } from "@context/BoardContext";
import { useThemeColors } from "@hooks/useThemeColors";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { Settings, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Task } from "@/interfaces/task";
import type { TaskList } from "@/interfaces/TaskList";
import { useTypography } from "@hooks/useTypography";
import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot";
import { useSettings } from "@hooks/useSettings";

interface HomeScreenProps {
  currentTask?: string;
  onOpenSettings: () => void;
  onClearCurrentTask?: () => void;
  focusMode: boolean;
  onToggleFocus: () => void;
  pomodoroEnabled?: boolean;
  pomodoroSeconds: number;
  pomodoroRunning: boolean;
  onTogglePomodoro: () => void;
}

const WalkthroughableButton = walkthroughable(TouchableOpacity); // Tutorial

export default function HomeScreen({
  currentTask,
  onOpenSettings,
  onClearCurrentTask,
  focusMode,
  onToggleFocus,
  pomodoroEnabled = true,
  pomodoroSeconds,
  pomodoroRunning,
  onTogglePomodoro,
}: HomeScreenProps) {
  const { lists, addTask, editTask, addList, editList } = useBoard();
  const { isDark, isHighContrast, screenBg, statusBarStyle, textSecondary } =
    useThemeColors();
  const { settings } = useSettings();
  const { scaledFontSize } = useTypography();
  const { start, copilotEvents } = useCopilot(); // Tutorial

  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeListId, setActiveListId] = useState<string>("");
  const [listModalVisible, setListModalVisible] = useState(false);
  const [editingList, setEditingList] = useState<TaskList | null>(null);
    const [tutorial, setTutorial] = useState<"newList" | "newTask" | null>("newList");
    const tutorialRef = useRef(tutorial);
  

  // Mapeamento simples de tokens
  const tokens = {
    custom: 10,
    sm: 14,
    md: 16,
    xs: 12,
    lg: 18,
    xl: 20,
  };

  const focusLists = focusMode
    ? lists.filter((l) => l.tasks.some((t) => !t.completed))
    : [];

  const openAddTask = (listId: string) => {
    setActiveListId(listId);
    setEditingTask(null);
    setTaskModalVisible(true);
  };
  const openEditTask = (task: Task, listId: string) => {
    setActiveListId(listId);
    setEditingTask(task);
    setTaskModalVisible(true);
  };
  const handleSaveTask = (
    title: string,
    description: string,
    listId: string,
  ) => {
    if (editingTask) editTask(editingTask.id, title, description, listId);
    else addTask(listId, title, description);
    setTaskModalVisible(false);
    setEditingTask(null);
  };
  const openAddList = () => {
    setEditingList(null);
    setListModalVisible(true);
  };
  const openEditList = (list: TaskList) => {
    setEditingList(list);
    setListModalVisible(true);
  };
  const handleSaveList = (title: string, color: string) => {
    if (editingList) editList(editingList.id, title, color);
    else addList(title, color);
    setEditingList(null);
    setListModalVisible(false);
  };

  

  const bannerBg = isHighContrast ? "#000000" : isDark ? "#2D2541" : "#EDE7F6";
  const bannerBorder = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#6B4FA0"
      : "#B39DDB";
  const bannerTextColor = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#C5A8FF"
      : "#4A2D8A";
      const helperBg = isHighContrast ? "#000000" : isDark ? "#63686d98" : "#c2d0daa4";
  const helperBorder = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#646b70"
      : "#a7adb1";
  const helperTextColor = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#6FA8DC"
      : "#2a2c2e";
  const addListBg = isHighContrast ? "#000000" : isDark ? "#1E2A35" : "#EAF3FB";
  const addListBorder = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#4A7FA8"
      : "#6FA8DC";
  const addListTextColor = isHighContrast
    ? "#FFFFFF"
    : isDark
      ? "#7BB8E0"
      : "#3A7CB8";

  const renderLists = () => {
    const targetLists = focusMode ? focusLists : lists;
    if (targetLists.length === 0) {
      return (
        <Box flex={1} alignItems="center" justifyContent="center" py="$16">
          <Text fontSize="$4xl" mb="$4">
            {focusMode ? "🎉" : "📋"}
          </Text>
          <Text
            fontWeight="$semibold"
            textAlign="center"
            style={{ fontSize: scaledFontSize(tokens.md), color: textSecondary }}
          >
            {focusMode ? "Nenhuma tarefa em aberto!" : "Nenhuma lista ainda"}
          </Text>
          <Text
            textAlign="center"
            mt="$1"
            style={{ fontSize: scaledFontSize(tokens.sm), color: textSecondary }}
          >
            {focusMode
              ? "Todas as suas tarefas estão concluídas."
              : "Crie sua primeira lista para começar"}
          </Text>
        </Box>
      );
    }

    

    return targetLists.map((list) => (
      <ListColumn
        key={list.id}
        list={list}
        onAddTask={openAddTask}
        onEditTask={openEditTask}
        onEditList={openEditList}
        tutorial={tutorial}
      />
    ));
  };

  useEffect(() => {
  tutorialRef.current = tutorial;
}, [tutorial]);

  // Passos Guiados
  useEffect(() => {
    const handleStepChange = (step: any) => {
      if (step?.name === "new_list_btn") {
        // Abre modal de criação
        openAddList();
      }
    };
    copilotEvents.on("stepChange", handleStepChange);

    return () => {
      copilotEvents.off("stepChange", handleStepChange);
    };
  }, [copilotEvents, openAddList]); 

  useEffect(() => {
  const handleStop = () => {
    if (tutorialRef.current === "newList") {
      setTutorial("newTask");

      setTimeout(() => {
        start();
      }, 400);
    }
  };

  copilotEvents.on("stop", handleStop);

  return () => {
    copilotEvents.off("stop", handleStop);
  };
}, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: screenBg }}
      edges={["top"]}
    >
      <StatusBar barStyle={statusBarStyle} backgroundColor={screenBg} />

      <AppHeader
        focusMode={focusMode}
        onToggleFocus={onToggleFocus}
        focusEnabled={true}
        pomodoroEnabled={pomodoroEnabled}
        pomodoroSeconds={pomodoroSeconds}
        pomodoroRunning={pomodoroRunning}
        onTogglePomodoro={onTogglePomodoro}
        onOpenSettings={onOpenSettings}
      />

      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Guia do app */}
        { (settings.visual.guidedSteps && !focusMode) && (
          <Box
            mb="$4"
            borderRadius="$2xl"
            px="$4"
            py="$3"
            style={{
              backgroundColor: helperBg,
              borderWidth: isHighContrast ? 2 : 1.5,
              borderColor: helperBorder,
            }}
          >
            <HStack space="sm" alignItems="center">
              <Text fontSize="$lg">❓</Text>
              <VStack flex={1}>
                <Text
                  fontWeight="$medium"
                  style={{ fontSize: scaledFontSize(tokens.xs), color: textSecondary }}
                >
                  {tutorial ? (tutorial === "newTask" ? " 2/2 Precisa de ajuda para criar uma atividade?" : "1/2 Precisa de ajuda para criar uma lista?") : "1/2 Precisa de ajuda para criar uma lista?"}
                </Text>
              </VStack>
              {onClearCurrentTask && (

                <Pressable
                  onPress={() => { start()}}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  $pressed={{ opacity: 0.6 }}
                >
                  <Text style={{ fontSize: scaledFontSize(tokens.xs), color: helperTextColor }}>
                     {tutorial ? (tutorial === "newTask" ? "Próximo passo" : "Iniciar tutorial") : "Iniciar tutorial"}
                  </Text>
                </Pressable>
              )}
            </HStack>
          </Box>
        )}
        {/* Banner foco atual */}
        {!focusMode && currentTask && (
          <Box
            mb="$4"
            borderRadius="$2xl"
            px="$4"
            py="$3"
            style={{
              backgroundColor: bannerBg,
              borderWidth: isHighContrast ? 2 : 1.5,
              borderColor: bannerBorder,
            }}
          >
            <HStack space="sm" alignItems="center">
              <Text fontSize="$lg">🎯</Text>
              <VStack flex={1}>
                <Text
                  fontWeight="$medium"
                  style={{ fontSize: scaledFontSize(tokens.xs), color: textSecondary }}
                >
                  Foco atual
                </Text>
                <Text
                  fontWeight="$bold"
                  numberOfLines={2}
                  style={{ fontSize: scaledFontSize(tokens.sm), color: bannerTextColor }}
                >
                  {currentTask}
                </Text>
              </VStack>
              {onClearCurrentTask && (
                <Pressable
                  onPress={onClearCurrentTask}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  $pressed={{ opacity: 0.6 }}
                >
                  <Text style={{ fontSize: scaledFontSize(tokens.xs), color: textSecondary }}>
                    ✕
                  </Text>
                </Pressable>
              )}
            </HStack>
          </Box>
        )}

        {/* Botão adicionar lista */}
        {!focusMode && (
          <CopilotStep 
            text="Crie sua lista aqui." 
            order={1} 
            name="new_list_btn"
            active={tutorial === "newList"}
          >
            <WalkthroughableButton>
            <Pressable
              onPress={openAddList}
              borderRadius="$2xl"
              py="$4"
              alignItems="center"
              mb="$3"
              $pressed={{ opacity: 0.75 }}
              style={{
                borderStyle: "dashed",
                borderWidth: isHighContrast ? 3 : 2,
                backgroundColor: addListBg,
                borderColor: addListBorder,
              }}
            >
              <Text
                fontWeight="$bold"
                style={{ fontSize: scaledFontSize(tokens.md), color: addListTextColor }}
              >
                + Adicionar lista
              </Text>
            </Pressable>
            </WalkthroughableButton>
          </CopilotStep>
        )}

        {renderLists()}
      </ScrollView>

      <TaskModal
        visible={taskModalVisible}
        lists={lists}
        defaultListId={activeListId}
        editingTask={editingTask}
        onSave={handleSaveTask}
        onCancel={() => {
          setTaskModalVisible(false);
          setEditingTask(null);
        }}
        tutorial={tutorial}
      />
      <ListModal
        visible={listModalVisible}
        editingList={editingList}
        onSave={handleSaveList}
        onCancel={() => {
          setListModalVisible(false);
          setEditingList(null);
        }}
        tutorial={tutorial}
      />
    </SafeAreaView>
  );
}
