import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DashboardComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Toggle the isMobile state based on the window width
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setIsDesktop(window.innerWidth > 768);
  };

  // Add event listener for window resize
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <VStack
      spacing={4}
      align="start"
      width={isMobile ? "100%" : "80%"}
      p={4}>
      {/* User Statistics */}
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        width="100%">
        <Heading
          size="lg"
          mb={2}>
          User Statistics
        </Heading>
        <Text>Total Users: 100</Text>
        <Text>Active Users: 80</Text>
        <Text>Inactive Users: 20</Text>
      </Box>

      {/* Recent Activities */}
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        width="100%">
        <Heading
          size="lg"
          mb={2}>
          Recent Activities
        </Heading>
        <Text>User John Doe updated their profile.</Text>
        <Text>New user registration: Jane Smith.</Text>
      </Box>

      {/* Settings Panel */}
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        width="100%">
        <Heading
          size="lg"
          mb={2}>
          Settings
        </Heading>
        <Text>Change Password</Text>
        <Text>Update Notification Preferences</Text>
      </Box>
    </VStack>
  );
};

export default DashboardComponent;
