// Login.tsx
import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface LoginProps {
  onSignupClick: () => void;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Add your authentication logic here
    // For example, you can make an API call to verify the credentials
    try {
      setIsLoading(true);

      // Simulating an API call
      // Replace this with your actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If authentication is successful, you can navigate to another page or update state accordingly
      // For now, just log in the console
      console.log("Login successful");

      setIsLoading(false);
    } catch (error) {
      // Handle authentication error
      console.error("Login failed", error);
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      h="80vh">
      <Box
        width="400px"
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg">
        <Stack spacing={4}>
          <FormControl isInvalid={!!error}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl isInvalid={!!error}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            onClick={handleLogin}
            isLoading={isLoading}>
            Login
          </Button>

          <Text>
            Don't have an account?{" "}
            <Link
              color="blue"
              href="/signup">
              Sign up here
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginForm;
