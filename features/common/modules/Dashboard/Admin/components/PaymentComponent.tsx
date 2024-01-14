import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
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

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(payments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/payment/payment.handler`);
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
          List Pembayaran
        </Heading>
        {currentPayments.length === 0 ? (
          <Text>Belum ada data pembayaran</Text>
        ) : (
          currentPayments.map((payment) => (
            <VStack
              spacing={2}
              align="start"
              p={4}
              key={payment.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                width="60%"
                p={2}>
                <Heading size="md">Payment ID: {payment.id}</Heading>
                <Text>Nama: {payment.name}</Text>
                <Text>Nama Akun Bank: {payment.bankAccountName}</Text>
                <Text>Nama Bank: {getCategoryBank(payment.bankName)}</Text>
                <Text>Nominal Transfer: {formatCurrency(payment.transferAmount)}</Text>
                <Text>Alamat: {payment.addresses}</Text>
                <Text>Jam Transfer: {formatDateTime(payment.paymentHours)}</Text>
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

export default PaymentComponent;
