// Import necessary libraries and components
import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, useDisclosure, Button } from "@chakra-ui/react";
import ComplaintmentForm from "./ComplaintmentForm";

// Interface for Complaint object
interface Complaint {
  id: string;
  addresses: string;
  categoryComplaint: string;
  notes: string;
  // Add other fields as needed based on your API response
}

// ComplainmentComponent functional component
const ComplainmentComponent: React.FC = () => {
  // State variables
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

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/complainment/complainment.handler?userId=${userData.id}`
      ); // Replace with your API endpoint
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Toggle the isMobile state based on the window width
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setIsDesktop(window.innerWidth > 768);
  };

  // Add event listener for window resize
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = () => {
    fetchData(); // Update the list of complaints after creating a new complaint
  };

  // Render component
  return (
    <VStack
      spacing={2}
      align="start"
      width={isMobile ? "100%" : "80%"}
      p={4}>
      {/* Complaint List */}
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        width="100%">
        <Heading
          size="lg"
          mb={10}>
          List Pengaduan
        </Heading>
        <Button
          onClick={onOpen}
          colorScheme="green">
          Create Complaint
        </Button>
        {complaints.length === 0 ? (
          <Text>Belum ada data komplen</Text>
        ) : (
          complaints.map((complaint) => (
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
                <Text>Category Complaint: {complaint.categoryComplaint}</Text>
                {/* Display other fields as needed */}
                <Text>Notes: {complaint.notes}</Text>
                {/* New Complaint Form */}
                <ComplaintmentForm
                  onFormSubmit={handleFormSubmit}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </Box>
            </VStack>
          ))
        )}
      </Box>
    </VStack>
  );
};

export default ComplainmentComponent;
