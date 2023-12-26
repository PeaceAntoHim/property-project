import React from "react";
import { Box, Flex, Heading, Spacer, useColorMode, IconButton, Text } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import Head from "next/head";
import { HiHomeModern } from "react-icons/hi2";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
}> = ({ children, title, description }) => {
  const { colorMode, toggleColorMode } = useColorMode();

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
          </Flex>
        </Box>

        {/* Main Content */}
        <Flex
          flex="1"
          p={{ base: 2, md: 4 }}>
          {/* Page Content */}
          <Box flex="1">{children}</Box>
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
              Tanjung Damai Lestari
            </Text>
          </Box>
          <Text
            fontSize="xs"
            textAlign="center">
            All rights reserved - Copyright Tanjung Damai Lestari
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;