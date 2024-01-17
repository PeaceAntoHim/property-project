import React from "react";
import DashboardLayout from "@/features/Layout/DashboardLayout";
import { Box } from "@chakra-ui/react";
import ClientDashboard from "@/features/common/modules/Dashboard/Client/ClientDashboard";

const ClientDetails = () => {
  return (
    <DashboardLayout
      title="Dashboard - Client"
      description='"Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.'>
      <Box
        backgroundColor="#f7f8f9"
        padding={{ base: "1rem", md: "3rem" }}>
        <Box
          maxWidth="2580px"
          margin="0 auto">
          <ClientDashboard />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default ClientDetails;
