// Import necessary libraries and components
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

// Interface for Complaint object
interface Complaint {
  id?: string;
  addresses: string;
  security?: string;
  cleanliness?: string;
  water?: string;
  electricity?: string;
  facilities?: string;
  permitsOrEvent?: string;
  notes: string;
}

// ComplaintForm component
const ComplaintForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  // State variables for the new complaint form
  const [newComplaint, setNewComplaint] = useState<Complaint>({
    addresses: "",
    security: "", // Initialize other fields as needed
    cleanliness: "",
    water: "",
    electricity: "",
    facilities: "",
    permitsOrEvent: "",
    notes: "",
  });

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComplaint((prevComplaint) => ({
      ...prevComplaint,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Add validation if needed
    // Here, you might want to send the new complaint to the server or update the state in ComplainmentComponent
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="xl">
        <ModalHeader>Create New Complaint</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            overflowY="auto"
            maxHeight="70vh">
            <FormControl>
              <FormLabel>Alamat</FormLabel>
              <Input
                type="text"
                name="addresses"
                value={newComplaint.addresses}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* Add other form fields as needed */}
            <FormControl mt={4}>
              <FormLabel>Keamanan</FormLabel>
              <Input
                type="text"
                name="security"
                value={newComplaint.security}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Kebersihan</FormLabel>
              <Input
                type="text"
                name="cleanliness"
                value={newComplaint.cleanliness}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Air</FormLabel>
              <Input
                type="text"
                name="water"
                value={newComplaint.water}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Listrik</FormLabel>
              <Input
                type="text"
                name="electricity"
                value={newComplaint.electricity}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Fasilitas</FormLabel>
              <Input
                type="text"
                name="facilities"
                value={newComplaint.facilities}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Izin atau Event</FormLabel>
              <Input
                type="text"
                name="permitsOrEvent"
                value={newComplaint.permitsOrEvent}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Pesan</FormLabel>
              <Textarea
                name="notes"
                value={newComplaint.notes}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ComplaintForm;
