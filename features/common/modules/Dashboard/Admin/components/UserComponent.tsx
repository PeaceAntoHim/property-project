import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other data fields as needed
}

const UserComponent: React.FC<UserProfile> = ({ id, name, email, role }) => {
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
      height="100vh" // Set height to 100% of viewport height
      p={4}>
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
        <Heading size="xm">User ID: {id}</Heading>
        <Heading size="xm">Nama: {name}</Heading>
        <Heading size="xm">Email: {email}</Heading>
        <Heading size="xm">Role: {role}</Heading>
        {/* Add other data fields here */}
      </Box>
    </VStack>
  );
};

export default UserComponent;
