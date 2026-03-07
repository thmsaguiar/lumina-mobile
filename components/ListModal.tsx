import type { TaskList } from "@/interfaces/TaskList";
import {
  Button,
  ButtonText,
  Divider,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useSettings } from "@hooks/useSettings";
import { useTypography } from "@hooks/useTypography";
import React, { useEffect, useState } from "react";

const COLORS = [
  { key: "white", hex: "#F5F5F5", border: "#CCCCCC" },
  { key: "yellow", hex: "#FFF3C4", border: "#F0D080" },
  { key: "blue", hex: "#BDD7F5", border: "#6FA8DC" },
  { key: "green", hex: "#B5D9C2", border: "#5C9C6E" },
];

interface ListModalProps {
  visible: boolean;
  editingList?: TaskList | null;
  onSave: (title: string, color: string) => void;
  onCancel: () => void;
}

export default function ListModal({
  visible,
  editingList,
  onSave,
  onCancel,
}: ListModalProps) {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("white");
  const { scaledFontSize } = useTypography();
  const { settings } = useSettings();

  // Mapeamento simples de tokens
  const tokens = {
    custom: 10,
    sm: 14,
    md: 16,
    xs: 12,
    lg: 18,
    xl: 20,
  };

  const isEditing = !!editingList;

  useEffect(() => {
    if (editingList) {
      setTitle(editingList.title);
      setSelectedColor(editingList.color || "white");
    } else {
      setTitle("");
      setSelectedColor("white");
    }
  }, [editingList, visible]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim(), selectedColor);
      setTitle("");
      setSelectedColor("white");
    }
  };

  const getHeaderSubtitle = () => {
    if (isEditing) {
      return "Atualize o título e a cor da sua lista.";
    }

    if (settings.cognitiveModes.lowAttention) {
      return "Nova lista para suas atividades.";
    }

    return "Crie uma nova lista para organizar suas atividades.";
  };
  const getTitle = () => {
    if (isEditing) {
      return "Editar lista";
    }

    if (settings.cognitiveModes.lowAttention) {
      return "Nova lista";
    }

    return "Adicionar uma nova lista";
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
        <ModalHeader px="$6" pt="$6" pb="$2">
          <VStack>
            <Text
              style={{ fontSize: scaledFontSize(tokens.xl) }}
              fontWeight="$bold"
              color="$textLight900"
            >
              {getTitle()}
            </Text>
            <Text
              style={{ fontSize: scaledFontSize(tokens.sm) }}
              color="$textLight500"
              mt="$1"
            >
              {getHeaderSubtitle()}
            </Text>
          </VStack>
        </ModalHeader>

        <Divider />

        <ModalBody px="$6" py="$4">
          <VStack space="md" py="$2">
            {/* Título */}
            <FormControl isRequired>
              <FormControlLabel>
                <FormControlLabelText
                  style={{ fontSize: scaledFontSize(tokens.sm) }}
                  fontWeight="$semibold"
                  color="$textLight600"
                >
                  Título
                </FormControlLabelText>
              </FormControlLabel>
              <Input bg="$backgroundLight100" borderRadius="$xl">
                <InputField
                  placeholder="Informe o título da lista"
                  placeholderTextColor="#AAAAAA"
                  value={title}
                  onChangeText={setTitle}
                  style={{
                    fontSize: scaledFontSize(tokens.sm),
                    color: "#1A1A1A",
                  }}
                />
              </Input>
            </FormControl>

            {/* Cor */}
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText
                  style={{ fontSize: scaledFontSize(tokens.sm) }}
                  fontWeight="$semibold"
                  color="$textLight600"
                >
                  Cor
                </FormControlLabelText>
              </FormControlLabel>
              <HStack space="md" mt="$1">
                {COLORS.map((c) => {
                  const selected = selectedColor === c.key;
                  return (
                    <Pressable
                      key={c.key}
                      onPress={() => setSelectedColor(c.key)}
                      w={44}
                      h={44}
                      borderRadius="$full"
                      style={{
                        backgroundColor: c.hex,
                        borderWidth: selected ? 3 : 2,
                        borderColor: selected ? "#3B5BDB" : c.border,
                      }}
                    />
                  );
                })}
              </HStack>
            </FormControl>
          </VStack>
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
      </ModalContent>
    </Modal>
  );
}
