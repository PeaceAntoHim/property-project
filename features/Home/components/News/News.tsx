import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { news } from "./newsConst";
import NewsCard from "./components/TestimonialCard/newsCard";

const News = () => {
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
          Pengumuman
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="light"
          marginTop="1rem"
          marginBottom="3rem"
          paddingX="2rem"
          textAlign="center">
          List pengumuman
        </Text>
        <SimpleGrid
          columns={3}
          minChildWidth="300px"
          gap={{ base: "0.5rem", sm: "2.5rem" }}>
          {news.map((data, index) => (
            <NewsCard
              key={index}
              data={data}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default News;
