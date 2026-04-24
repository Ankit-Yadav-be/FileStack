import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Fade,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FiFolder,
  FiImage,
  FiPlus,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

import CreateFolderModal from "../../../components/common/folder/CreateFolderModal";
import UploadImageModal from "../../../components/common/image/UploadImageModal";
import { getImagesAPI } from "../../../services/imageService";
import { getFolderSizeAPI } from "../../../services/folderService";
import formatSize from "../../../utils/formatSize";

const FolderCard = ({ folder, refresh, setSelectedImage, selectedImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [size, setSize] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const fetchImages = async () => {
    const data = await getImagesAPI(folder._id);
    setImages(data);
  };

  const fetchSize = async () => {
    const res = await getFolderSizeAPI(folder._id);
    setSize(res.totalSize);
  };

  useEffect(() => {
    fetchImages();
    fetchSize();
  }, []);

  return (
    <Box
      ml={4}
      pl={4}
      mt={3}
      borderLeft="2px solid #e2e8f0"
      _hover={{ borderColor: "blue.400" }}
      transition="0.2s"
      minW="max-content"
    >
      <VStack align="start" spacing={2}>
        
        {/* 🔥 Folder Header */}
        <HStack
          w="full"
          justify="space-between"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
          px={2}
          py={1}
          borderRadius="md"
          onClick={() => setExpanded(!expanded)}
        >
          <HStack spacing={2}>
            <Icon
              as={expanded ? FiChevronDown : FiChevronRight}
              color="gray.500"
            />

            <Icon as={FiFolder} color="blue.500" />

            <Text fontWeight="semibold" fontSize="sm">
              {folder.name}
            </Text>

            {/* 🔥 Count */}
            <Text fontSize="xs" color="gray.400">
              ({images.length})
            </Text>
          </HStack>

          <Text fontSize="xs" color="gray.500">
            {formatSize(size)}
          </Text>
        </HStack>

        {/* 🔥 Hover Actions */}
        <HStack spacing={2} opacity={0.7} _hover={{ opacity: 1 }}>
          <Button
            size="xs"
            variant="ghost"
            leftIcon={<FiPlus />}
            colorScheme="blue"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            Folder
          </Button>

          <Button
            size="xs"
            variant="ghost"
            leftIcon={<FiImage />}
            colorScheme="green"
            onClick={(e) => {
              e.stopPropagation();
              setIsUploadOpen(true);
            }}
          >
            Image
          </Button>
        </HStack>

        {/* 🔥 CONTENT */}
        {expanded && (
          <Fade in={expanded}>
            <VStack align="start" spacing={1}>
              
              {/* Empty State */}
              {images.length === 0 && (
                <Text fontSize="xs" color="gray.400" ml={2}>
                  No files
                </Text>
              )}

              {/* Images */}
              {images.map((img) => (
                <HStack
                  key={img._id}
                  px={2}
                  py={1}
                  borderRadius="md"
                  cursor="pointer"
                  bg={
                    selectedImage?._id === img._id
                      ? "blue.100"
                      : "transparent"
                  }
                  _hover={{ bg: "gray.100" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(img);
                  }}
                >
                  <Icon as={FiImage} color="gray.500" />

                  <Text fontSize="sm">{img.name}</Text>
                </HStack>
              ))}

              {/* Children */}
              {folder.children?.map((child) => (
                <FolderCard
                  key={child._id}
                  folder={child}
                  refresh={refresh}
                  setSelectedImage={setSelectedImage}
                  selectedImage={selectedImage}
                />
              ))}
            </VStack>
          </Fade>
        )}
      </VStack>

      {/* Modals */}
      <CreateFolderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        refresh={refresh}
        parentId={folder._id}
      />

      <UploadImageModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        folderId={folder._id}
        refresh={() => {
          fetchImages();
          fetchSize();
        }}
      />
    </Box>
  );
};

export default FolderCard;