import type { Task } from "@/interfaces/task";
import {
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useClearReading } from "@hooks/useClearReading";
import { useTypography } from "@hooks/useTypography";

import React from "react";

export function TaskCardInline({
  task,
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
  const { isClearReading } = useClearReading();
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
            style={{fontSize: scaledFontSize(tokens.sm),}}
            fontWeight="$semibold"
            color={task.completed ? "$textLight400" : "$textLight900"}
            strikeThrough={task.completed}
          >
            {task.title}
          </Text>
         
          {!isClearReading && task.description ? (
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
                  style={{ fontSize: scaledFontSize(tokens.custom), color: "#2A6496", fontWeight: "600" }}
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
                style={{ fontSize: scaledFontSize(tokens.custom), color: "#8B2020", fontWeight: "600" }}
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
