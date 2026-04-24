import { Box, Image, Text, VStack } from "@chakra-ui/react";

const ImagePreview = ({ image }) => {
  if (!image) {
    return (
      <Box textAlign="center" mt={20} color="gray.500">
        Select an image to preview
      </Box>
    );
  }

  return (
    <VStack spacing={4}>
      <Text fontWeight="bold">{image.name}</Text>

      <Image
        src={image.url}
        maxH="500px"
        borderRadius="md"
        shadow="lg"
      />
    </VStack>
  );
};

export default ImagePreview;