// Login.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { validateEmail } from "@/lib/utils";
import { useRouter } from "next/router";
import { SignInResponse, signIn } from "next-auth/react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailInPutError, setEmailInputError] = useState(false);
  const [passwordInPutError, setPasswordInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    validate();
  }, [email, password]);

  async function handleSubmit(e: any) {
    setIsLoading(true);
    e.preventDefault();

    interface TRes extends SignInResponse {
      error: string | null;
      status: number;
      ok: boolean;
      url: string | null;
      json(): Promise<Record<string, string>>;
    }

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
      redirect: false,
    });

    console.log(res);
    if (res?.ok) {
      // toastsuccess
      console.info("success");
      // const data: Record<string, string> = await res.json();
      // const mappingUrl = {
      //   client: `/dashboard/client/${data.id}`,
      //   admin: `/dashboard/admin/${data.id}`,
      // };
      // router.push((mappingUrl as any)[data.role]);
      alert("success");
      return;
    } else {
      // Toast failed
      setError("Failed! Check you input and try again.");
      // return;
    }
    console.log("Failed", res);
    setIsLoading(false);
    return res;
  }

  function validate() {
    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      setEmailInputError(true);
      return;
    }
    if (password.length < 6) {
      setPasswordInputError(true);
    } else {
      setEmailInputError(false);
      setPasswordInputError(false);
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
        <Heading
          mb={4}
          textAlign="center">
          Sign In
        </Heading>
        <Stack spacing={4}>
          <FormControl isInvalid={!!error}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              borderColor={emailInPutError ? "red.500" : ""}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isInvalid={!!error}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              borderColor={passwordInPutError ? "red.500" : ""}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isLoading}>
            Login
          </Button>

          <Text>
            Don't have an account?{" "}
            <Link
              as={NextLink}
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
