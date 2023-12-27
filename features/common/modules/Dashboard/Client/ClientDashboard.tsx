import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Spacer,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiUsers, FiSettings } from "react-icons/fi";

const ClientDashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Toggle the isMobile state based on the window width
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setIsDesktop(window.innerWidth > 768);
  };

  // Add event listener for window resize
  React.useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile || isDesktop) {
      onOpen();
    }
  };

  return (
    <Flex height="100%">
      {/* Toggle Button for Larger Screens */}
      {(isMobile || isDesktop) && (
        <IconButton
          aria-label="Toggle Sidebar"
          icon={<FiMenu />}
          onClick={toggleSidebar}
          position="fixed"
          top="4"
          left="4"
          zIndex="1"
        />
      )}

      {/* Sidebar */}
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Client Dashboard</DrawerHeader>
            <DrawerBody>
              <VStack
                spacing={4}
                align="start"
                width="100%"
                p={4}>
                {/* Navigation Links */}
                <VStack
                  align="start"
                  spacing={2}
                  width="100%">
                  <Link
                    href="#"
                    fontSize="xl"
                    display="flex"
                    alignItems="center">
                    <Icon
                      as={FiHome}
                      fontSize="xl"
                      mr={2}
                    />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    fontSize="xl"
                    display="flex"
                    alignItems="center">
                    <Icon
                      as={FiUsers}
                      fontSize="xl"
                      mr={2}
                    />
                    Users
                  </Link>
                  <Link
                    href="#"
                    fontSize="xl"
                    display="flex"
                    alignItems="center">
                    <Icon
                      as={FiSettings}
                      fontSize="xl"
                      mr={2}
                    />
                    Settings
                  </Link>
                </VStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* Main Content */}
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
    </Flex>
  );
};

export default ClientDashboard;
