import { Box, Button, Checkbox, Flex, FormControl, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type HeroFormType = {
  name: string;
  email: string;
  phoneNumber: string;
  agreement: string;
};

const HeroForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroFormType>();

  const onSubmit = async (data: HeroFormType) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/property-guide/property-guide.handler`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful (status code 200)
      if (res.ok) {
        // Assuming the API returns the file path or name
        // Construct the public URL of the PDF file
        const pdfUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/public/Brosur-Perumahan.pdf`;

        // Trigger the file download
        window.location.href = pdfUrl;
      } else {
        // Handle error cases
        alert(`Error submitting the form: ${res.statusText}`);
        console.error("Error submitting the form:", res.statusText);
      }
    } catch (error: any) {
      alert(`Got Err: ${error.message}`);
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Box
        width="100%"
        padding="2rem"
        borderRadius="sm"
        backgroundColor="white"
        color="gray.700">
        <Text
          fontSize="xl"
          fontWeight="bold">
          Free PDF Guide
        </Text>
        <Text fontSize="lg">Complete the form below to download your guide</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <VStack
              spacing={1}
              align="flex-start">
              <Input
                marginTop="1.3rem"
                id="name"
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Text
                  fontSize="xs"
                  color="red.400">
                  {errors.name.type}
                </Text>
              )}
            </VStack>
            <Flex
              gap={{ base: "0", sm: "1rem" }}
              flexDirection={{ base: "column-reverse", sm: "row" }}>
              <VStack
                spacing={1}
                align="flex-start">
                <Input
                  marginTop="1.3rem"
                  id="email"
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <Text
                    fontSize="xs"
                    color="red.400">
                    {errors.email.type}
                  </Text>
                )}
              </VStack>
              <VStack
                spacing={1}
                align="flex-start">
                <Input
                  marginTop="1.3rem"
                  id="phoneNumber"
                  type="phone"
                  placeholder="Phone Number"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && (
                  <Text
                    fontSize="xs"
                    color="red.400">
                    {errors.phoneNumber.type}
                  </Text>
                )}
              </VStack>
            </Flex>
            <Checkbox
              marginTop="1.3rem"
              id="agreement"
              type="checkbox"
              placeholder="GDPR"
              {...register("agreement", { required: true })}>
              I consent to having this website store my submitted info
            </Checkbox>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            fontSize="xl"
            padding="2rem"
            marginTop="2rem">
            Download Now
          </Button>
        </form>
      </Box>
    </>
  );
};

export default HeroForm;
