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
        paddingY={{ base: "1rem", sm: "2rem" }}>
        <Text
          fontSize={{ base: "4xl", sm: "5xl" }}
          lineHeight="shorter"
          fontWeight="light"
          marginBottom="3rem"
          paddingX="2rem"
          textAlign="center">
          Pengumuman
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
