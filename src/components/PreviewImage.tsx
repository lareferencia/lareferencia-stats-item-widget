import { Box, Image } from "@chakra-ui/react";
import previewImageSrc from "../assets/widget-preview.png";

const PreviewImage = () => {
  
  return (
    <Box display="flex" justifyContent="center" alignContent="center" cursor='pointer'>
      <Image objectFit="cover" src={previewImageSrc} alt="" />
    </Box>
  );
};

export default PreviewImage;
