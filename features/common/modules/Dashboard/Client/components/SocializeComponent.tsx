import { Box, SimpleGrid } from "@chakra-ui/react";
import Socialize from "@/features/Home/components/Socializes";

const SocializeComponent: React.FC = () => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      minHeight="50vh"
      width="100%">
      <SimpleGrid
        columns={{ base: 1, md: 1 }}
        spacing={4}>
        <Socialize />
      </SimpleGrid>
    </Box>
  );
};

export default SocializeComponent;
