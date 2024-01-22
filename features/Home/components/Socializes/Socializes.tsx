import SocializeCard from "@/features/Home/components/Socializes/components/SocializeCard";
import { socializes } from "@/features/Home/components/Socializes/socializeConst";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Socializes = () => {
  return (
    <Box backgroundColor="blue.50">
      <Box
        maxWidth="1280px"
        margin="0 auto"
        paddingY={{ base: "3rem", sm: "6rem" }}>
        <Text
          fontSize={{ base: "4xl", sm: "5xl" }}
          lineHeight="shorter"
          fontWeight="light"
          paddingX="2rem"
          textAlign="center">
          Sosialisasi
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="light"
          marginTop="1rem"
          marginBottom="3rem"
          paddingX="2rem"
          textAlign="center">
          List data sosial komplek
        </Text>
        <SimpleGrid
          columns={3}
          minChildWidth="300px"
          gap={{ base: "0.5rem", sm: "2.5rem" }}>
          {socializes.map((socialize, index) => (
            <SocializeCard
              key={index}
              socialize={socialize}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Socializes;
