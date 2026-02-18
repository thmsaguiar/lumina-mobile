import type { Task, TaskList } from "@context/BoardContext";
import { useBoard } from "@context/BoardContext";
import {
  Box,
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react-native";
import React, { useState } from "react";

const COLOR_MAP: Record<string, string> = {
  white: "#F5F5F5",
  yellow: "#FFF9E6",
  blue: "#E8F0FE",
  green: "#E6F4EA",
};

interface ListColumnProps {
  list: TaskList;
  onAddTask: (listId: string) => void;
  onEditTask: (task: Task, listId: string) => void;
  onEditList: (list: TaskList) => void;
}

export default function ListColumn({
  list,
  onAddTask,
  onEditTask,
  onEditList,
}: ListColumnProps) {
  const { deleteList, deleteTask, toggleTask } = useBoard();
  const [expanded, setExpanded] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const bgColor = COLOR_MAP[list.color || "white"] ?? "#F5F5F5";

  const handleDeleteList = () => {
    setMenuVisible(false);
    deleteList(list.id);
  };

  const handleEditList = () => {
    setMenuVisible(false);
    onEditList(list);
  };

  return (
    <Box
      borderRadius="$2xl"
      mb="$3"
      overflow="hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header */}
      <HStack
        px="$4"
        py="$3"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="$md" fontWeight="$bold" color="$textLight900" flex={1}>
          {list.title}{" "}
          <Text fontWeight="$normal" color="$textLight500">
            ({list.tasks.length})
          </Text>
        </Text>

        <HStack space="xs" alignItems="center">
          <Pressable
            onPress={() => setExpanded((e) => !e)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            p="$1"
          >
            <Icon
              as={expanded ? ChevronUp : ChevronDown}
              size="sm"
              color="$textLight500"
            />
          </Pressable>

          <Pressable
            onPress={() => setMenuVisible(true)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            p="$1"
          >
            <Icon as={MoreHorizontal} size="sm" color="$textLight500" />
          </Pressable>
        </HStack>
      </HStack>

      {/* Tasks */}
      {expanded && (
        <Box px="$3" pb="$3">
          {list.tasks.map((task) => (
            <TaskCardInline
              key={task.id}
              task={task}
              listId={list.id}
              onEdit={() => onEditTask(task, list.id)}
              onDelete={() => deleteTask(task.id, list.id)}
              onToggle={() => toggleTask(task.id, list.id)}
            />
          ))}

          <Pressable onPress={() => onAddTask(list.id)} py="$3">
            <HStack alignItems="center" justifyContent="center" space="xs">
              <Icon as={Plus} size="xs" color="$textLight500" />
              <Text fontSize="$sm" fontWeight="$medium" color="$textLight500">
                Adicionar atividade
              </Text>
            </HStack>
          </Pressable>
        </Box>
      )}

      {/* Menu dropdown */}
      <Modal
        isOpen={menuVisible}
        onClose={() => setMenuVisible(false)}
        size="sm"
      >
        <ModalBackdrop />
        <ModalContent borderRadius="$2xl">
          <ModalBody p="$2">
            <Pressable
              onPress={handleEditList}
              px="$4"
              py="$3"
              borderRadius="$xl"
              $pressed={{ bg: "$backgroundLight100" }}
            >
              <HStack space="md" alignItems="center">
                <Icon as={Pencil} size="sm" color="$textLight700" />
                <Text fontSize="$md" fontWeight="$medium" color="$textLight900">
                  Editar lista
                </Text>
              </HStack>
            </Pressable>

            <Box h={1} bg="$borderLight100" mx="$2" my="$1" />

            <Pressable
              onPress={handleDeleteList}
              px="$4"
              py="$3"
              borderRadius="$xl"
              $pressed={{ bg: "$backgroundLight100" }}
            >
              <HStack space="md" alignItems="center">
                <Icon as={Trash2} size="sm" color="$error600" />
                <Text fontSize="$md" fontWeight="$medium" color="$error600">
                  Remover lista
                </Text>
              </HStack>
            </Pressable>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

// ── TaskCard inline (evita importação circular) ───────────────────────────────

function TaskCardInline({
  task,
  listId,
  onEdit,
  onDelete,
  onToggle,
}: {
  task: Task;
  listId: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const {
    CheckCircle2,
    Circle,
    Edit2,
    Trash2,
  } = require("lucide-react-native");

  return (
    <Box
      bg="$white"
      borderRadius="$xl"
      borderWidth={1}
      borderColor="$borderLight200"
      p="$3"
      mb="$2"
    >
      <HStack space="sm" alignItems="center">
        <Pressable
          onPress={onToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon
            as={task.completed ? CheckCircle2 : Circle}
            size="lg"
            color={task.completed ? "$success600" : "$borderLight400"}
          />
        </Pressable>

        <VStack flex={1}>
          <Text
            fontSize="$sm"
            fontWeight="$semibold"
            color={task.completed ? "$textLight400" : "$textLight900"}
            strikeThrough={task.completed}
          >
            {task.title}
          </Text>
          {task.description ? (
            <Text
              fontSize="$xs"
              color={task.completed ? "$textLight300" : "$textLight500"}
              strikeThrough={task.completed}
              mt="$0.5"
            >
              {task.description}
            </Text>
          ) : null}
        </VStack>

        <HStack space="xs" alignItems="center">
          {!task.completed && (
            <Pressable
              onPress={onEdit}
              style={{
                backgroundColor: "#BDD7F5",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 6,
                alignItems: "center",
              }}
              $pressed={{ opacity: 0.75 }}
            >
              <VStack alignItems="center" space="xs">
                <Icon as={Edit2} size="xs" style={{ color: "#2A6496" }} />
                <Text
                  style={{ fontSize: 10, color: "#2A6496", fontWeight: "600" }}
                >
                  Editar
                </Text>
              </VStack>
            </Pressable>
          )}
          <Pressable
            onPress={onDelete}
            style={{
              backgroundColor: "#F5B5B5",
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 6,
              alignItems: "center",
            }}
            $pressed={{ opacity: 0.75 }}
          >
            <VStack alignItems="center" space="xs">
              <Icon as={Trash2} size="xs" style={{ color: "#8B2020" }} />
              <Text
                style={{ fontSize: 10, color: "#8B2020", fontWeight: "600" }}
              >
                Excluir
              </Text>
            </VStack>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}
