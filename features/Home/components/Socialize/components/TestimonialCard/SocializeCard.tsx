import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TypeSocialize } from "../../socializeConst";

const SocializeCard: React.FC<{
  socialize: TypeSocialize;
}> = ({ socialize }) => {
  return (
    <Box
      backgroundColor="#ffffff"
      padding="3rem"
      display="flex"
      flexDirection="column"
      marginBottom={{ base: "1rem", sm: "0" }}>
      <Heading
        fontSize="xl"
        textAlign="center"
        color="gray.500"
        marginY="1.8rem">
        {socialize.title}
      </Heading>
      <Flex
        gap="1rem"
        alignItems="center">
        <Box>
          {socialize.contacts.map((contact, index) => (
            <Text
              key={index}
              fontSize="lg"
              fontStyle="italic"
              fontWeight="light"
              color="gray.600">
              Name: {contact.name}
              <br />
              No. Telphone: {contact.phoneNumber}
            </Text>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default SocializeCard;
