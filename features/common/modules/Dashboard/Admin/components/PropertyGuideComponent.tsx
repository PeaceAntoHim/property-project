import { useState, useEffect, useRef } from "react";
import { Box, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
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
  const itemsPerPageRef = useRef<number>(3);
  const itemsPerPage = itemsPerPageRef.current;

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
    if (isDesktop) {
      itemsPerPageRef.current = 9;
    } else {
      itemsPerPageRef.current = 3; //Reset to the default value if not in desktop mode
    }
  }, [isDesktop]);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      width="100%">
      <Heading
        size="lg"
        mb={isMobile ? 4 : 10} // Adjusted margin for mobile
      >
        List Property Guide
      </Heading>
      {currentPropertyGuides.length === 0 ? (
        <Text>Belum ada data property guide</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={4}>
          {currentPropertyGuides.map((propertyGuide) => (
            <Box
              key={propertyGuide.id}
              borderWidth="1px"
              borderRadius="lg"
              width="100%"
              p={2}>
              <Heading size="md">Property Guide ID: {propertyGuide.id}</Heading>
              <Text>Nama: {propertyGuide.name}</Text>
              <Text>Email: {propertyGuide.email}</Text>
              <Text>No. Telphone: {propertyGuide.phoneNumber}</Text>
              <Text>Agreement: {formatAgreement(propertyGuide.agreement)}</Text>
            </Box>
          ))}
        </SimpleGrid>
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
  );
};

export default PropertyGuideComponent;
