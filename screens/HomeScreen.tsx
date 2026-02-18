import AppHeader from "@components/AppHeader";
import ListColumn from "@components/ListColumn";
import ListModal from "@components/ListModal";
import TaskModal from "@components/TaskModal";
import type { Task, TaskList } from "@context/BoardContext";
import { useBoard } from "@context/BoardContext";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeScreenProps {
  currentTask?: string;
  onOpenSettings: () => void;
  pomodoroEnabled?: boolean;
}

export default function HomeScreen({
  currentTask,
  onOpenSettings,
  pomodoroEnabled = true,
}: HomeScreenProps) {
  const { lists, addTask, editTask, addList, editList } = useBoard();
  const [focusMode, setFocusMode] = useState(false);

  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeListId, setActiveListId] = useState<string>("");

  const [listModalVisible, setListModalVisible] = useState(false);
  const [editingList, setEditingList] = useState<TaskList | null>(null);

  const focusList = focusMode
    ? lists.find((l) => l.tasks.some((t) => !t.completed)) || null
    : null;

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
    const targetLists = focusMode && focusList ? [focusList] : lists;

    if (targetLists.length === 0) {
      return (
        <Box flex={1} alignItems="center" justifyContent="center" py="$16">
          <Text fontSize="$4xl" mb="$4">
            📋
          </Text>
          <Text
            fontSize="$md"
            fontWeight="$semibold"
            color="$textLight600"
            textAlign="center"
          >
            Nenhuma lista ainda
          </Text>
          <Text fontSize="$sm" color="$textLight400" textAlign="center" mt="$1">
            Crie sua primeira lista para começar
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
      style={{ flex: 1, backgroundColor: "#F2F2F2" }}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <AppHeader
        focusMode={focusMode}
        onToggleFocus={() => setFocusMode((f) => !f)}
        pomodoroEnabled={pomodoroEnabled}
        onOpenSettings={onOpenSettings}
      />

      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {!focusMode && currentTask && (
          <Box
            mb="$4"
            borderRadius="$2xl"
            px="$4"
            py="$3"
            style={{
              backgroundColor: "#EDE7F6",
              borderWidth: 1.5,
              borderColor: "#B39DDB",
            }}
          >
            <HStack space="sm" alignItems="center">
              <Text fontSize="$lg">🎯</Text>
              <VStack flex={1}>
                <Text fontSize="$xs" color="$textLight500" fontWeight="$medium">
                  Foco atual
                </Text>
                <Text
                  fontSize="$sm"
                  fontWeight="$bold"
                  style={{ color: "#4A2D8A" }}
                  numberOfLines={2}
                >
                  {currentTask}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}

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
                color="$textLight900"
                mb="$0.5"
              >
                Quadro de atividades
              </Text>
              <Text fontSize="$xs" color="$textLight500" lineHeight="$sm">
                Visualize e acompanhe suas atividades de forma organizada.
              </Text>
            </VStack>
          </HStack>
        )}

        {!focusMode && (
          <Pressable
            onPress={openAddList}
            borderRadius="$2xl"
            py="$4"
            alignItems="center"
            mb="$3"
            borderWidth={2}
            borderColor="#6FA8DC"
            style={{ borderStyle: "dashed", backgroundColor: "#EAF3FB" }}
            $pressed={{ opacity: 0.75 }}
          >
            <HStack space="xs" alignItems="center">
              <Text fontSize="$md" style={{ color: "#3A7CB8" }}>
                +
              </Text>
              <Text
                fontSize="$sm"
                fontWeight="$bold"
                style={{ color: "#3A7CB8" }}
              >
                Adicionar lista
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
