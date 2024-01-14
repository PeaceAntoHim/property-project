import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { formatAgreement } from "@/lib/utils";

interface Booking {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
  propertyId: number;
  agreement: boolean;
}

const BookingComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bookings.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/booking/booking.handler`);
      const data = await response.json();
      setBookings(data);
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
          List Booking
        </Heading>
        {currentBookings.length === 0 ? (
          <Text>Belum ada data booking</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={4}>
            {currentBookings.map((booking) => (
              <Box
                key={booking.id}
                borderWidth="1px"
                borderRadius="lg"
                width="100%"
                p={2}>
                <Heading size="md">Booking ID: {booking.id}</Heading>
                <Heading size="xm">Property ID: {booking.propertyId || "-"}</Heading>
                <Text>Nama: {booking.name}</Text>
                <Text>Nomor HP: {booking.phoneNumber}</Text>
                <Text>Email: {booking.email}</Text>
                <Text>Pesan: {booking.message}</Text>
                <Text>Agreement: {formatAgreement(booking.agreement)}</Text>
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
    </VStack>
  );
};

export default BookingComponent;
