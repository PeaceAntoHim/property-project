import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FacilityCard from "@/features/common/modules/Navigation/FacilityCard/FacilityCard";
import { getFacilities } from "@/features/common/API/getFacilities";

const Facilities = ({ facilities }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <DefaultLayout
      title="Facilities"
      description='"Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.'>
      <Box
        backgroundColor="#f7f8f9"
        padding="3rem">
        <Box
          maxWidth="1280px"
          margin="0 auto">
          <SimpleGrid
            columns={{ base: 1, sm: 3 }}
            gap={{ base: "0", sm: "2rem" }}>
            {facilities.map((facility: Record<string, string>, index: any) => (
              <FacilityCard
                key={index}
                {...facility}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Facilities;

export const getStaticProps: GetStaticProps = async () => {
  const facilities = await getFacilities();

  return {
    props: {
      facilities: facilities,
    },
  };
};
