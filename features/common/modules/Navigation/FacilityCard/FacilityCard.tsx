import React from "react";
import { Box } from "@chakra-ui/react";

const FacilityCard = (facility: Record<string, string>) => {
  return (
    <Box
      marginBottom="4rem"
      backgroundColor="#fff">
      <Box
        backgroundImage={`url("${facility.coverUrl}")`}
        height="250px"
        backgroundPosition="center center"
        backgroundSize="cover"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="space-between">
        {/* <Box margin="1rem">
          <Badge colorScheme="green">{purpose}</Badge>
        </Box> */}
        {/* <Box
          height="50%"
          bgGradient="linear(to-t, #0a0b1cd9, #ffffff00 100%)"
          display="flex"
          alignItems="flex-end"
          padding="1rem">
          <Text
            fontSize="3xl"
            fontWeight="medium"
            color="whiteAlpha.800">
            {price}
          </Text>
        </Box> */}
      </Box>
    </Box>
  );
};

export default FacilityCard;
