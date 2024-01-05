// Import necessary libraries and components
import { Box, VStack, Heading, Text, useDisclosure, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ComplaintmentForm from "./ComplaintmentForm";

// Interface for Complaint object
interface Complaint {
  id: string;
  addresses: string;
  security?: string;
  cleanliness?: string;
  water?: string;
  electricity?: string;
  facilities?: string;
  permitsOrEvent?: string;
  notes: string;
}

// ComplainmentComponent functional component
const ComplainmentComponent: React.FC = () => {
  // State variables
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  // State variables for the new complaint form
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Dummy data for complaints
  const dummyComplaints: Complaint[] = [
    {
      id: "1",
      addresses: "123 Main St",
      security: "Good",
      cleanliness: "Excellent",
      water: "No issues",
      electricity: "Stable",
      facilities: "Satisfactory",
      permitsOrEvent: "None",
      notes: "Everything seems fine.",
    },
    {
      id: "2",
      addresses: "456 Oak St",
      security: "Fair",
      cleanliness: "Average",
      water: "Low pressure",
      electricity: "Intermittent",
      facilities: "Needs improvement",
      permitsOrEvent: "Upcoming event",
      notes: "Some issues reported by residents.",
    },
    // Add more dummy complaints as needed
  ];

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

  // Set dummy complaints data on component mount
  useEffect(() => {
    setComplaints(dummyComplaints);
  }, []);

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
        {complaints.map((complaint) => (
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
              <Text>Security: {complaint.security}</Text>
              <Text>Cleanliness: {complaint.cleanliness}</Text>
              {/* Display other fields as needed */}
              <Text>Notes: {complaint.notes}</Text>
              {/* New Complaint Form */}
              <ComplaintmentForm
                isOpen={isOpen}
                onClose={onClose}
              />
            </Box>
          </VStack>
        ))}
      </Box>
    </VStack>
  );
};

export default ComplainmentComponent;
