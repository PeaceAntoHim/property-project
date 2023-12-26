import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import DashboardLayout from "@/features/Layout/DashboardLayout";
import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminDashboard from "@/features/common/modules/Dashboard/Admin/AdminDashboard";
import { getProperties } from "@/features/common/API/getProperties";

const Properties = ({ properties }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <DashboardLayout
      title="Dashboard - Admin"
      description='"Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.'>
      <Box
        backgroundColor="#f7f8f9"
        padding={{ base: "1rem", md: "3rem" }}>
        <Box
          maxWidth="2580px"
          margin="0 auto">
          <AdminDashboard />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Properties;

export const getStaticProps: GetStaticProps = async () => {
  const properties = await getProperties(20);

  return {
    props: {
      properties: properties,
    },
  };
};
