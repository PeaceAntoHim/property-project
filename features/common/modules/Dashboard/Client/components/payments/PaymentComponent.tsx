import { useState, useEffect, useRef } from "react";
import { Box, Heading, Text, useDisclosure, Button, SimpleGrid } from "@chakra-ui/react";
import PaymentForm from "./PaymentForm";
import { formatCurrency, formatDateTime, getCategoryBank } from "@/lib/utils";

interface Payment {
  id: string;
  name: string;
  userId: string;
  bankAccountName: string;
  addresses: string;
  bankName: string;
  transferAmount: number;
  paymentHours: Date;
}

const PaymentComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);
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
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(payments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/payment/payment.handler?userId=${userData.id}`
      );
      const data = await response.json();
      setPayments(data);
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
      itemsPerPageRef.current = 6;
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
        List Pembayaran
      </Heading>
      <Button
        onClick={onOpen}
        colorScheme="green"
        mb="10">
        Buat Pembayaran Baru
      </Button>
      {currentPayments.length === 0 ? (
        <Text>Belum ada data pembayaran</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={4}>
          {currentPayments.map((payment) => (
            <Box
              key={payment.id}
              borderWidth="1px"
              borderRadius="lg"
              width="100%"
              p={2}>
              <Heading size="md">Payment ID: {payment.id}</Heading>
              <Text>Nama: {payment.name}</Text>
              <Text>Nama Akun Bank: {payment.bankAccountName}</Text>
              <Text>Nama Bank: {getCategoryBank(payment.bankName)}</Text>
              <Text>Nominal Transfer: {formatCurrency(payment.transferAmount)}</Text>
              <Text>Alamat: {payment.addresses}</Text>
              <Text>Jam Transfer: {formatDateTime(payment.paymentHours)}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
      {/* payment form  */}
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
  );
};

export default PaymentComponent;
