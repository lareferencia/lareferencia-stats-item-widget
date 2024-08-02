import { Box } from "@chakra-ui/react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="500px"
    >
      <MoonLoader
        color="#080a09"
        cssOverride={{}}
        size={40}
        speedMultiplier={1}
      />
    </Box>
  );
};

export default Loading;
