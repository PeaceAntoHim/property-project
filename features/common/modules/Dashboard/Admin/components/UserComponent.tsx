import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

const UserComponent: React.FC = () => {
  const tempUserData = localStorage.getItem("user");
  const userData = !tempUserData ? "" : JSON.parse(tempUserData);

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      minHeight="50vh"
      width="100%">
      <SimpleGrid
        columns={{ base: 1, md: 1 }}
        spacing={4}>
        {/* User Profile */}
        <Box
          p={4}
          borderRadius="lg"
          width="100%">
          <Heading
            size="lg"
            mb={2}>
            User Profile
          </Heading>
          <Heading size="xm">User ID: {userData.id}</Heading>
          <Heading size="xm">Nama: {userData.name}</Heading>
          <Heading size="xm">Email: {userData.email}</Heading>
          <Heading size="xm">Role: {userData.role}</Heading>
          {/* Add other data fields here */}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserComponent;
