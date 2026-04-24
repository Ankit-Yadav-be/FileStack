import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  Text,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiFolderPlus } from "react-icons/fi";
import { createFolderAPI } from "../../../services/folderService";

const CreateFolderModal = ({ isOpen, onClose, refresh, parentId }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleCreate = async () => {
    if (!name.trim()) {
      toast({
        title: "Folder name is required",
        status: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      await createFolderAPI({
        name,
        parentFolder: parentId || null,
      });

      toast({
        title: "Folder created successfully",
        status: "success",
      });

      setName("");
      onClose();
      refresh();
    } catch (err) {
      toast({
        title: "Failed to create folder",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(6px)" />

      <ModalContent borderRadius="xl" p={2}>
        
        {/*  HEADER */}
        <ModalHeader>
          <VStack align="start" spacing={1}>
            <Icon as={FiFolderPlus} color="blue.500" boxSize={5} />
            <Text fontSize="lg" fontWeight="bold">
              Create New Folder
            </Text>
            <Text fontSize="sm" color="gray.500">
              Organize your files efficiently
            </Text>
          </VStack>
        </ModalHeader>

        {/*  BODY */}
        <ModalBody>
          <VStack spacing={3}>
            <Input
              placeholder="Enter folder name..."
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
              focusBorderColor="blue.500"
            />
          </VStack>
        </ModalBody>

        {/*  FOOTER */}
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={onClose}
            isDisabled={loading}
          >
            Cancel
          </Button>

          <Button
            colorScheme="blue"
            onClick={handleCreate}
            isLoading={loading}
            loadingText="Creating..."
          >
            Create Folder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateFolderModal;