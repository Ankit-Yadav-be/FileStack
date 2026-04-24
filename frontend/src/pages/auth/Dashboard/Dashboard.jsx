import {
  Box,
  Button,
  Heading,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import FolderTree from "../../../components/common/folder/FolderTree";
import CreateFolderModal from "../../../components/common/folder/CreateFolderModal";
import ImagePreview from "../../../components/common/image/ImagePreview";
import { getFolderTreeAPI } from "../../../services/folderService";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  const fetchFolders = async () => {
    try {
      const data = await getFolderTreeAPI();
      setFolders(data);
    } catch (err) {
      toast({
        title: "Failed to load folders",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <Box h="100vh" overflow="hidden">
      <Navbar />

      <Flex h="calc(100vh - 70px)" overflow="hidden">

        {/*  LEFT SIDEBAR */}
        <Box
          w="320px"
          minW="280px"
          maxW="350px"
          flexShrink={0}
          borderRight="1px solid #e2e8f0"
          overflowY="auto"
          overflowX="auto"   
          whiteSpace="nowrap" 
          bg="white"
        >
          {/*  Sticky Header */}
          <Box
            p={4}
            position="sticky"
            top="0"
            bg="white"
            zIndex="10"
            borderBottom="1px solid #e2e8f0"
          >
            <Heading size="md" mb={3}>
              My Drive
            </Heading>

            <Button
              size="sm"
              w="full"
              colorScheme="blue"
              onClick={() => setIsOpen(true)}
            >
              + Create Folder
            </Button>
          </Box>

          {/* Folder Tree */}
          <Box p={3}>
            <FolderTree
              folders={folders}
              refresh={fetchFolders}
              setSelectedImage={setSelectedImage}
            />
          </Box>
        </Box>

        {/*  RIGHT PANEL */}
        <Box flex="1" p={6} overflow="auto" bg="gray.50">
          <ImagePreview image={selectedImage} />
        </Box>
      </Flex>

      <CreateFolderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        refresh={fetchFolders}
      />
    </Box>
  );
};

export default Dashboard;