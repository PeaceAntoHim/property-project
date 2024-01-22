import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { TypeNews } from "../../newsConst";

const NewsCard: React.FC<{
  data: TypeNews;
}> = ({ data }) => {
  return (
    <Box
      backgroundColor="#ffffff"
      padding="3rem"
      display="flex"
      flexDirection="column"
      marginBottom={{ base: "1rem", sm: "0" }}>
      <Flex
        gap="1rem"
        alignItems="center">
        <Box>
          <Text
            fontSize="lg"
            fontStyle="italic"
            fontWeight="light"
            color="gray.600">
            {data.message}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default NewsCard;
