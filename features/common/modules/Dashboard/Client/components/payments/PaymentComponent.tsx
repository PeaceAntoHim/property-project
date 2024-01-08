import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, useDisclosure, Button } from "@chakra-ui/react";
import PaymentForm from "./PaymentForm";
import { getCategoryLabel } from "@/lib/utils";

interface Complaint {
  id: string;
  addresses: string;
  categoryComplaint: string;
  notes: string;
}

const PaymentComponent: React.FC = () => {
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
  const itemsPerPage = 3;

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
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/payment/payment.handler?userId=${userData.id}`
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
    fetchData();
  }, []);

  const handleFormSubmit = () => {
    fetchData();
  };

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
          List Pembayaran
        </Heading>
        <Button
          onClick={onOpen}
          colorScheme="green">
          Buat Pembayaran Baru
        </Button>
        {currentComplaints.length === 0 ? (
          <Text>Belum ada data pembayaran</Text>
        ) : (
          currentComplaints.map((complaint) => (
            <VStack
              spacing={2}
              align="start"
              p={4}
              key={complaint.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                width="60%"
                p={2}>
                <Heading size="md">Complaint ID: {complaint.id}</Heading>
                <Text>Addresses: {complaint.addresses}</Text>
                <Text>Category Complaint: {getCategoryLabel(complaint.categoryComplaint)}</Text>
                <Text>Notes: {complaint.notes}</Text>
              </Box>
            </VStack>
          ))
        )}
        {/* Complaint form  */}
        <PaymentForm
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
    </VStack>
  );
};

export default PaymentComponent;
