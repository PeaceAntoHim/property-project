// Import necessary dependencies
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Spinner, Flex } from "@chakra-ui/react";

// Functional component for SignupForm
const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passError, setPassError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  function validatePassword(pass: string, confirmPass: string) {
    let isValid = pass === confirmPass;
    setPassError(!isValid);
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    setIsLoading(true);
    e.preventDefault();

    if (passError) {
      // Handle password mismatch error
      return alert("Pass salah");;
    }

    const userData = {
      name,
      email,
      password,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);
    if (res?.ok) {
      const data = await res.json();
      router.push("/login");
      // Registration success
    } else {
      // Registration failed
      alert(`Registrasi failed, got this err: ${res.statusText}`);
    }
  }

  if (isLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        h="80vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={16}
      mb={20}
      p={6}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg">
      <Heading
        mb={4}
        textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Username Input */}
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>

          {/* Email Input */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          {/* Password Input */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          {/* Confirm Password Input */}
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validatePassword(password, e.target.value);
              }}
              required
            />
          </FormControl>

          {/* Display password mismatch error */}
          {passError && (
            <Box
              color="red.500"
              fontSize="sm">
              Passwords do not match.
            </Box>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            fontSize="md">
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

// Export the SignupForm component
export default SignupForm;
