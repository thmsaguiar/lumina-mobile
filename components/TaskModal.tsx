import type { Task } from "@/interfaces/task";
import type { TaskList } from "@/interfaces/TaskList";
import {
  Box,
  Button,
  ButtonText,
  Divider,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  KeyboardAvoidingView,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";

interface TaskModalProps {
  visible: boolean;
  lists: TaskList[];
  defaultListId?: string;
  editingTask?: Task | null;
  onSave: (title: string, description: string, listId: string) => void;
  onCancel: () => void;
}

export default function TaskModal({
  visible,
  lists,
  defaultListId,
  editingTask,
  onSave,
  onCancel,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedListId, setSelectedListId] = useState(
    defaultListId || lists[0]?.id || "",
  );

  const isEditing = !!editingTask;

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
    if (defaultListId) setSelectedListId(defaultListId);
  }, [editingTask, defaultListId, visible]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim(), description.trim(), selectedListId);
    }
  };

  return (
    <Modal isOpen={visible} onClose={onCancel} size="full">
      <ModalBackdrop />
      <ModalContent
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        borderBottomLeftRadius="$none"
        borderBottomRightRadius="$none"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        m="$0"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ModalHeader px="$6" pt="$6" pb="$2">
            <VStack>
              <Text fontSize="$xl" fontWeight="$bold" color="$textLight900">
                {isEditing
                  ? "Editar atividade"
                  : "Adicionar uma nova atividade"}
              </Text>
              <Text fontSize="$sm" color="$textLight500" mt="$1" pb="$1">
                {isEditing
                  ? "Atualize os dados da sua atividade."
                  : "Preencha as informações para organizar sua tarefa."}
              </Text>
            </VStack>
          </ModalHeader>

          <Divider />

          <ModalBody px="$6" py="$4">
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <VStack space="md" p="$1">
                {/* Título */}
                <FormControl isRequired>
                  <FormControlLabel>
                    <FormControlLabelText
                      fontSize="$sm"
                      fontWeight="$semibold"
                      color="$textLight600"
                    >
                      Título
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input bg="$backgroundLight100" borderRadius="$xl">
                    <InputField
                      placeholder="Informe o título da sua atividade"
                      placeholderTextColor="#AAAAAA"
                      value={title}
                      onChangeText={setTitle}
                      fontSize="$sm"
                      style={{ color: "#1A1A1A" }}
                    />
                  </Input>
                </FormControl>

                {/* Descrição */}
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText
                      fontSize="$sm"
                      fontWeight="$semibold"
                      color="$textLight600"
                    >
                      Descrição
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Textarea bg="$backgroundLight100" borderRadius="$xl" h={90}>
                    <TextareaInput
                      placeholder="Adicione detalhes da atividade"
                      placeholderTextColor="#AAAAAA"
                      value={description}
                      onChangeText={setDescription}
                      fontSize="$sm"
                      style={{ color: "#1A1A1A" }}
                    />
                  </Textarea>
                </FormControl>

                {/* Lista */}
                <FormControl isRequired>
                  <FormControlLabel>
                    <FormControlLabelText
                      fontSize="$sm"
                      fontWeight="$semibold"
                      color="$textLight600"
                    >
                      Lista de atividades
                    </FormControlLabelText>
                  </FormControlLabel>
                  <VStack space="xs">
                    {lists.map((list) => {
                      const selected = selectedListId === list.id;
                      return (
                        <Pressable
                          key={list.id}
                          onPress={() => setSelectedListId(list.id)}
                          bg={selected ? "$primary100" : "$backgroundLight100"}
                          borderRadius="$xl"
                          borderWidth={2}
                          borderColor={selected ? "$primary500" : "transparent"}
                          px="$4"
                          py="$3"
                        >
                          <Text
                            fontSize="$sm"
                            fontWeight={selected ? "$bold" : "$medium"}
                            color={selected ? "$primary700" : "$textLight700"}
                          >
                            {list.title}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </VStack>
                </FormControl>
              </VStack>
            </ScrollView>
          </ModalBody>

          <Divider />

          <ModalFooter px="$6" py="$4">
            <HStack space="md" flex={1} justifyContent="flex-end">
              <Button
                variant="outline"
                borderRadius="$xl"
                onPress={onCancel}
                flex={1}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button
                borderRadius="$xl"
                onPress={handleSave}
                isDisabled={!title.trim()}
                flex={1}
                bg={!title.trim() ? "$backgroundLight300" : "$primary600"}
              >
                <ButtonText>{isEditing ? "Salvar" : "Adicionar"}</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </KeyboardAvoidingView>
      </ModalContent>
    </Modal>
  );
}
