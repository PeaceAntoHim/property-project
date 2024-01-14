import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { formatAgreement } from "@/lib/utils";

interface propertyGuide {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  agreement: boolean;
}

const PropertyGuideComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [propertyGuides, setpropertyGuides] = useState<propertyGuide[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPropertyGuides = propertyGuides.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(propertyGuides.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/property-guide/property-guide.handler`);
      const data = await response.json();
      setpropertyGuides(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <VStack
      spacing={2}
      align="start"
      width={isMobile ? "100%" : "80%"}
      p={4}>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        width="100%">
        <Heading
          size="lg"
          mb={10}>
          List Property Guide
        </Heading>
        {currentPropertyGuides.length === 0 ? (
          <Text>Belum ada data property guide</Text>
        ) : (
          currentPropertyGuides.map((propertyGuide) => (
            <VStack
              spacing={2}
              align="start"
              p={4}
              key={propertyGuide.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                width="60%"
                p={2}>
                <Heading size="md">Property Guide ID: {propertyGuide.id}</Heading>
                <Text>Nama: {propertyGuide.name}</Text>
                <Text>Email: {propertyGuide.email}</Text>
                <Text>No. Telphone: {propertyGuide.phoneNumber}</Text>
                <Text>Agreement: {formatAgreement(propertyGuide.agreement)}</Text>
              </Box>
            </VStack>
          ))
        )}
        {/* Pagination Controls */}
        <Box mt={4}>
          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "solid" : "outline"}
              colorScheme="teal"
              onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </Button>
          ))}
        </Box>
      </Box>
    </VStack>
  );
};

export default PropertyGuideComponent;
