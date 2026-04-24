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
  Box,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiUploadCloud, FiImage, FiX } from "react-icons/fi";
import { uploadImageAPI } from "../../../services/imageService";

const UploadImageModal = ({ isOpen, onClose, folderId, refresh }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast({
        title: "Only image files are allowed",
        status: "warning",
      });
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!name.trim()) {
      toast({ title: "Image name is required", status: "warning" });
      return;
    }

    if (!file) {
      toast({ title: "Please select an image", status: "warning" });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("folderId", folderId);
      formData.append("image", file);

      await uploadImageAPI(formData);

      toast({
        title: "Image uploaded successfully",
        status: "success",
      });

      setName("");
      setFile(null);
      setPreview(null);
      onClose();
      refresh();
    } catch (err) {
      toast({
        title: "Upload failed",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(6px)" />

      <ModalContent borderRadius="xl" p={2}>
        
        {/*  HEADER */}
        <ModalHeader>
          <VStack align="start" spacing={1}>
            <Text fontSize="lg" fontWeight="bold">
              Upload Image
            </Text>
            <Text fontSize="sm" color="gray.500">
              Add images to your folder
            </Text>
          </VStack>
        </ModalHeader>

        {/*  BODY */}
        <ModalBody>
          <VStack spacing={4}>
            
            {/* Image Name */}
            <Input
              placeholder="Enter image name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              focusBorderColor="green.500"
            />

            {/* Upload Area */}
            {!preview ? (
              <Box
                w="full"
                p={6}
                border="2px dashed #cbd5e0"
                borderRadius="lg"
                textAlign="center"
                cursor="pointer"
                _hover={{ borderColor: "green.400", bg: "green.50" }}
                transition="0.2s"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <Icon as={FiUploadCloud} boxSize={8} color="gray.400" />
                <Text mt={2} fontSize="sm" color="gray.500">
                  Click to upload or drag image
                </Text>

                <Input
                  id="fileInput"
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e.target.files[0])
                  }
                />
              </Box>
            ) : (
              <Box w="full" position="relative">
                <Image
                  src={preview}
                  borderRadius="md"
                  maxH="200px"
                  objectFit="cover"
                  w="full"
                />

                {/* Remove Button */}
                <Button
                  size="xs"
                  position="absolute"
                  top="2"
                  right="2"
                  colorScheme="red"
                  onClick={removeFile}
                >
                  <Icon as={FiX} />
                </Button>

                {/* File Info */}
                <HStack mt={2} spacing={2}>
                  <Icon as={FiImage} color="gray.500" />
                  <Text fontSize="sm" color="gray.600">
                    {file?.name}
                  </Text>
                </HStack>
              </Box>
            )}
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
            colorScheme="green"
            onClick={handleUpload}
            isLoading={loading}
            loadingText="Uploading..."
          >
            Upload Image
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadImageModal;