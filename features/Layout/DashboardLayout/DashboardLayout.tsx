import React, { useEffect } from "react";
import { Box, Flex, Heading, Spacer, useColorMode, IconButton, Text } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import Head from "next/head";
import { BiLogOut } from "react-icons/bi";
import { HiHomeModern } from "react-icons/hi2";
import router from "next/router";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
}> = ({ children, title, description }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    // Check user data in local storage for auth token and expiration
    const tempAuthData = localStorage.getItem("auth");
    const authData = !tempAuthData ? "" : JSON.parse(tempAuthData);
    if (!authData?.token) {
      // Auth token not found, redirect to login
      router.push("/login");
    }
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const onLogout = () => {
    // Remove items from local storage
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          name="theme-color"
          content="#000000"
        />
        <link
          rel="icon"
          href="/logo.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>

      <Flex
        direction="column"
        minHeight="100vh">
        {/* Header */}
        <Box
          p={4}
          backgroundColor={colorMode === "light" ? "gray.100" : "gray.800"}
          borderBottomWidth="1px">
          <Flex align="center">
            <IconButton
              icon={<HiHomeModern />}
              aria-label="Home"
              fontSize="xl"
              mr={2}
            />
            <Heading size="md">Dashboard</Heading>
            <Spacer />
            <IconButton
              icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
              aria-label="Toggle Dark Mode"
              onClick={toggleColorMode}
            />
            <IconButton
              icon={<BiLogOut />}
              aria-label="Logout"
              onClick={onLogout}
              fontSize="xl"
              colorScheme="red" // Choose a color scheme that fits your design
              variant="ghost" // You can use "solid" or other variants based on your design
            />
          </Flex>
        </Box>

        {/* Main Content */}
        <Flex
          flex="1"
          height="100%"
          p={{ base: 2, md: 4 }}>
          {/* Page Content */}
          <Box
            flex="1"
            mx="auto" // Center the content horizontally
          >
            {children}
          </Box>
        </Flex>

        {/* Footer */}
        <Box
          backgroundColor="blue.900"
          display="flex"
          padding="1rem"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          color="white">
          <Box
            display="flex"
            gap="2"
            alignItems="center">
            <HiHomeModern />
            <Text
              fontSize="md"
              fontWeight="black">
              Perum TDL
            </Text>
          </Box>
          <Text
            fontSize="xs"
            textAlign="center">
            All rights reserved - Copyright Perum TDL
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;
