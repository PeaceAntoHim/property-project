// Import necessary dependencies
import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading } from "@chakra-ui/react";

// Functional component for SignupForm
const SignupForm = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your signup logic here
    console.log("Form submitted:", formData);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          {/* Email Input */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          {/* Password Input */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </FormControl>

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
