import { Box, Button, Checkbox, Flex, FormControl, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ContactFormType = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  agreement: boolean;
  propertyId?: number;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>();
  const router = useRouter();
  const { propertyId } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ContactFormType) => {
    setIsLoading(true);
    if (propertyId) {
      data.propertyId = parseInt(propertyId as string);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/booking/booking.handler`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    if (res?.ok) {
      const data = await res.json();
      alert(data.message);
      router.push("/");
      // Registration success
    } else {
      // Registration failed
      alert(`Registrasi failed, got this err: ${res.statusText}`);
    }
  };

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
      width="100%"
      borderRadius="sm"
      backgroundColor="white"
      color="gray.700">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input
            marginTop="1.3rem"
            id="name"
            type="text"
            placeholder="Name"
            required
            {...register("name", { required: true })}
          />
          <Input
            marginTop="1.3rem"
            id="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            required
            {...register("phoneNumber", { required: true })}
          />
          <Input
            marginTop="1.3rem"
            id="email"
            type="email"
            placeholder="Email"
            required
            {...register("email", { required: true })}
          />
          <Textarea
            marginTop="1.3rem"
            id="message"
            placeholder="Message"
            required
            {...register("message", { required: true })}
          />
          <Checkbox
            marginTop="1.3rem"
            id="agreement"
            type="checkbox"
            width="100%"
            required
            placeholder="agreement"
            {...register("agreement", { required: true })}>
            <Text
              fontSize="0.8rem"
              color="gray.500">
              I consent to having this website store my details for future communication
            </Text>
          </Checkbox>
          <Button
            type="submit"
            colorScheme="blue"
            display="flex"
            fontSize="base"
            padding="1.6rem"
            marginTop="4rem"
            marginLeft="auto">
            Send Message
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ContactForm;
