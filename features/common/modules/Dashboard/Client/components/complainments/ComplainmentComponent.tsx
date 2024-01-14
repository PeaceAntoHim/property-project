import { useState, useEffect, useRef } from "react";
import { Box, Heading, Text, useDisclosure, Button, SimpleGrid } from "@chakra-ui/react";
import ComplaintmentForm from "./ComplaintmentForm";
import { getCategoryLabel } from "@/lib/utils";

interface Complaint {
  id: string;
  addresses: string;
  categoryComplaint: string;
  notes: string;
}

const ComplainmentComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tempUser = localStorage.getItem("user");
  let userData = {
    id: "",
  };
  if (tempUser) {
    userData = JSON.parse(tempUser);
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPageRef = useRef<number>(3);
  const itemsPerPage = itemsPerPageRef.current;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(complaints.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/complainment/complainment.handler?userId=${userData.id}`
      );
      const data = await response.json();
      setComplaints(data);
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

  const handleFormSubmit = () => {
    fetchData();
  };

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
        List Pengaduan
      </Heading>
      <Button
        onClick={onOpen}
        colorScheme="green"
        mb="10">
        Create Complaint
      </Button>
      {currentComplaints.length === 0 ? (
        <Text>Belum ada data komplen</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={4}>
          {currentComplaints.map((complaint) => (
            <Box
              key={complaint.id}
              borderWidth="1px"
              borderRadius="lg"
              width="100%"
              p={2}>
              <Heading size="md">Complaint ID: {complaint.id}</Heading>
              <Text>Addresses: {complaint.addresses}</Text>
              <Text>Category Complaint: {getCategoryLabel(complaint.categoryComplaint)}</Text>
              <Text>Notes: {complaint.notes}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
      {/* Complaint form  */}
      <ComplaintmentForm
        onFormSubmit={handleFormSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
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

export default ComplainmentComponent;
