import type { Task } from "@/interfaces/task";
import {
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useTypography } from "@hooks/useTypography";
import { CheckCircle2, Circle, Edit2, Trash2 } from "lucide-react-native";
import React from "react";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const { scaledFontSize } = useTypography();

  // Mapeamento simples de tokens
  const tokens = {
    custom: 10,
    sm: 14,
    md: 16,
    xs: 12,
    lg: 18,
    xl: 20,
  };
  
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
        {/* Checkbox */}
        <Pressable
          onPress={() => onToggle(task.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {task.completed ? (
            <Icon as={CheckCircle2} size="lg" color="$success600" />
          ) : (
            <Icon as={Circle} size="lg" color="$borderLight400" />
          )}
        </Pressable>

        {/* Texto */}
        <VStack flex={1}>
          <Text
            style={{fontSize: scaledFontSize(tokens.sm),}}
            fontWeight="$semibold"
            color={task.completed ? "$textLight400" : "$textLight900"}
            strikeThrough={task.completed}
          >
            {task.title}
          </Text>
          {task.description ? (
            <Text
              style={{fontSize: scaledFontSize(tokens.xs),}}
              color={task.completed ? "$textLight300" : "$textLight500"}
              strikeThrough={task.completed}
              mt="$0.5"
            >
              {task.description}
            </Text>
          ) : null}
        </VStack>

        {/* Ações */}
        <HStack space="sm" alignItems="center">
          {!task.completed && onEdit && (
            <Pressable onPress={() => onEdit(task)}>
              <VStack alignItems="center" space="xs">
                <Icon as={Edit2} size="sm" color="$textLight500" />
                <Text style={{fontSize: scaledFontSize(tokens.custom),}} color="$textLight500">
                  Editar
                </Text>
              </VStack>
            </Pressable>
          )}
          <Pressable onPress={() => onDelete(task.id)}>
            <VStack alignItems="center" space="xs">
              <Icon as={Trash2} size="sm" color="$textLight500" />
              <Text style={{fontSize: scaledFontSize(tokens.custom),}} color="$textLight500">
                Excluir
              </Text>
            </VStack>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}