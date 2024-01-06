import React, { useState } from "react";
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
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";

interface Complaint {
  userId: string;
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

const ComplaintmentForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  let userData = localStorage.getItem("user");
  if (userData) {
    userData = JSON.parse(userData);
  }
  const [newComplaint, setNewComplaint] = useState<Complaint>({
    userId: "",
    addresses: "",
    categoryComplaint: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewComplaint((prevComplaint) => ({
      ...prevComplaint,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when submitting
      newComplaint.userId = userData.id;
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/complainment/complainment.handler`, {
        method: "POST",
        body: JSON.stringify(newComplaint),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.complaint);
        onClose();
      } else {
        const errorData = await res.json();
        alert(`Complaint submission failed. Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred while submitting the complaint:", error);
      alert("Complaint submission failed. Please try again.");
    } finally {
      setLoading(false); // Set loading back to false when the operation is complete
    }
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
            <FormLabel>List Kategori Keluhan</FormLabel>
            <Select
              name="categoryComplaint"
              value={newComplaint.categoryComplaint}
              onChange={handleInputChange}>
              <option
                value=""
                disabled
                hidden>
                -- Pilih Kategori Keluhan --
              </option>
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
            onClick={handleSubmit}
            disabled={loading}>
            {loading ? <Spinner size="md" /> : "Submit"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ComplaintmentForm;
