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
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Task } from "@/interfaces/task";
import type { TaskList } from "@/interfaces/TaskList";

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
  const { isDark, screenBg, statusBarStyle, textPrimary, textSecondary } =
    useThemeColors();

  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeListId, setActiveListId] = useState<string>("");
  const [listModalVisible, setListModalVisible] = useState(false);
  const [editingList, setEditingList] = useState<TaskList | null>(null);

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
    if (editingTask) {
      editTask(editingTask.id, title, description, listId);
    } else {
      addTask(listId, title, description);
    }
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
    if (editingList) {
      editList(editingList.id, title, color);
    } else {
      addList(title, color);
    }
    setEditingList(null);
    setListModalVisible(false);
  };

  const renderLists = () => {
    const targetLists = focusMode ? focusLists : lists;

    if (targetLists.length === 0) {
      return (
        <Box flex={1} alignItems="center" justifyContent="center" py="$16">
          <Text fontSize="$4xl" mb="$4">
            {focusMode ? "🎉" : "📋"}
          </Text>
          <Text
            fontSize="$md"
            fontWeight="$semibold"
            textAlign="center"
            style={{ color: textSecondary }}
          >
            {focusMode ? "Nenhuma tarefa em aberto!" : "Nenhuma lista ainda"}
          </Text>
          <Text
            fontSize="$sm"
            textAlign="center"
            mt="$1"
            style={{ color: textSecondary }}
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
      />
    ));
  };

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
        {/* Banner foco atual */}
        {!focusMode && currentTask && (
          <Box
            mb="$4"
            borderRadius="$2xl"
            px="$4"
            py="$3"
            style={{
              backgroundColor: isDark ? "#2D2541" : "#EDE7F6",
              borderWidth: 1.5,
              borderColor: isDark ? "#6B4FA0" : "#B39DDB",
            }}
          >
            <HStack space="sm" alignItems="center">
              <Text fontSize="$lg">🎯</Text>
              <VStack flex={1}>
                <Text
                  fontSize="$xs"
                  fontWeight="$medium"
                  style={{ color: textSecondary }}
                >
                  Foco atual
                </Text>
                <Text
                  fontSize="$sm"
                  fontWeight="$bold"
                  numberOfLines={2}
                  style={{ color: isDark ? "#C5A8FF" : "#4A2D8A" }}
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
                  <Text
                    fontSize="$xs"
                    style={{ color: isDark ? "#9B7DD4" : "#7B52AB" }}
                  >
                    ✕
                  </Text>
                </Pressable>
              )}
            </HStack>
          </Box>
        )}

        {/* Cabeçalho */}
        {!focusMode && (
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"
            mb="$5"
          >
            <VStack flex={1} mr="$3">
              <Text
                fontSize="$xl"
                fontWeight="$bold"
                mb="$0.5"
                style={{ color: textPrimary }}
              >
                Quadro de atividades
              </Text>
              <Text
                fontSize="$xs"
                lineHeight="$sm"
                style={{ color: textSecondary }}
              >
                Visualize e acompanhe suas atividades de forma organizada.
              </Text>
            </VStack>
          </HStack>
        )}

        {/* Botão adicionar lista */}
        {!focusMode && (
          <Pressable
            onPress={openAddList}
            borderRadius="$2xl"
            py="$4"
            alignItems="center"
            mb="$3"
            $pressed={{ opacity: 0.75 }}
            style={{
              borderStyle: "dashed",
              borderWidth: 2,
              backgroundColor: isDark ? "#1E2A35" : "#EAF3FB",
              borderColor: isDark ? "#4A7FA8" : "#6FA8DC",
            }}
          >
            <HStack space="xs" alignItems="center">
              <Text
                fontSize="$md"
                fontWeight="$bold"
                style={{ color: isDark ? "#7BB8E0" : "#3A7CB8" }}
              >
                + Adicionar lista
              </Text>
            </HStack>
          </Pressable>
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
      />

      <ListModal
        visible={listModalVisible}
        editingList={editingList}
        onSave={handleSaveList}
        onCancel={() => {
          setListModalVisible(false);
          setEditingList(null);
        }}
      />
    </SafeAreaView>
  );
}
