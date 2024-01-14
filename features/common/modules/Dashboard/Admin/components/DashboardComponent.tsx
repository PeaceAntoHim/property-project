import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

const DashboardComponent: React.FC = () => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      width="100%">
      <SimpleGrid
        columns={{ base: 1, md: 1 }}
        spacing={4}>
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
      </SimpleGrid>
    </Box>
  );
};

export default DashboardComponent;
