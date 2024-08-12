import { Box, Text } from "@chakra-ui/react";

const ErrorView = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Text as="h1">No se encontró información</Text>
    </Box>
  );
};

export default ErrorView;
