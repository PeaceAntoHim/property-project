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
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

// Interface for Complaint object
interface Complaint {
  id?: string;
  addresses: string;
  categoryComplaint: string;
  notes: string;
}

const categories = [
  { value: "security", label: "Keamanan" },
  { value: "cleanliness", label: "Kebersihan" },
  { value: "water", label: "Air" },
  { value: "electricity", label: "Listrik" },
  { value: "facilities", label: "Fasilitas" },
  { value: "permitsOrEvent", label: "Izin atau Event" },
];

// ComplaintForm component
const ComplaintForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [newComplaint, setNewComplaint] = useState<Complaint>({
    addresses: "",
    categoryComplaint: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewComplaint((prevComplaint) => ({
      ...prevComplaint,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        maxW="xl"
        top="15%"
        m={4}>
        <ModalHeader mt={4}>Buat Keluhan Baru</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Alamat</FormLabel>
            <Input
              type="text"
              name="addresses"
              value={newComplaint.addresses}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Pilih Kategori Keluhan</FormLabel>
            <Select
              name="categoryComplaint" // Change "category" to "categoryComplaint"
              value={newComplaint.categoryComplaint}
              onChange={handleInputChange}>
              {categories.map((category) => (
                <option
                  key={category.value}
                  value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
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
            mb={8}
            colorScheme="blue"
            onClick={handleSubmit}>
            Submit
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ComplaintForm;
