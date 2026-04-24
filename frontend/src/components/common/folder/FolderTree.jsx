import { Box } from "@chakra-ui/react";
import FolderCard from "./FolderCard";

const FolderTree = ({ folders, refresh, setSelectedImage }) => {
  return (
    <Box>
      {folders.map((folder) => (
        <FolderCard
          key={folder._id}
          folder={folder}
          refresh={refresh}
          setSelectedImage={setSelectedImage}
        />
      ))}
    </Box>
  );
};

export default FolderTree;