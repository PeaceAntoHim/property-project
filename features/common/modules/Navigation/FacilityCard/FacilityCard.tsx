import React from "react";
import { Badge, Box } from "@chakra-ui/react";

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
        <Box margin="1rem">
          <Badge colorScheme="green">{facility.title}</Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default FacilityCard;
