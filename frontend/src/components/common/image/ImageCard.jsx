import { Box, Image, Text } from "@chakra-ui/react";

const ImageCard = ({ img }) => {
  return (
    <Box borderWidth="1px" p={2} borderRadius="md">
      <Image src={img.url} alt={img.name} borderRadius="md" />
      <Text mt={2} fontSize="sm">
        {img.name}
      </Text>
    </Box>
  );
};

export default ImageCard;