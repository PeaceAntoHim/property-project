import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, useDisclosure, Button } from "@chakra-ui/react";
import PaymentForm from "./PaymentForm";
import { getCategoryBank } from "@/lib/utils";

interface Payment {
  paymentHours: Date;
  id: string;
  name: string;
  userId: string;
  bankAccountNumber: string;
  addresses: string;
  bankName: string;
  transferAmount: number;
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
  const formatDateTime = (date: Date): string => {
    const data = new Date(date);
    return data.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour clock format
      timeZone: "Asia/Jakarta", // Adjust the time zone to Indonesia's time zone
    });
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  };

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
                <Text>No Akun Bank: {payment.bankAccountNumber}</Text>
                <Text>Nama Bank: {getCategoryBank(payment.bankName)}</Text>
                <Text>Nominal Transfer: {formatCurrency(payment.transferAmount)}</Text>
                <Text>Alamat: {payment.addresses}</Text>
                <Text>Jam Transfer: {formatDateTime(payment.paymentHours)}</Text>
              </Box>
            </VStack>
          ))
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
    </VStack>
  );
};

export default PaymentComponent;
