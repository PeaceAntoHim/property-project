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
  Text,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { banks } from "@/lib/utils";

interface Payment {
  name: string;
  userId: string;
  bankAccountName: string;
  addresses: string;
  bankName: string;
  transferAmount: string;
}

interface ComplaintmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onFormSubmit: () => void;
}

const PaymentForm: React.FC<ComplaintmentFormProps> = ({ isOpen, onClose, onFormSubmit }) => {
  const tempUser = localStorage.getItem("user");
  let userData = {
    name: "",
    id: "",
  };
  if (tempUser) {
    userData = JSON.parse(tempUser);
  }
  const [newPayment, setNewPayment] = useState<Payment>({
    name: "",
    userId: "",
    bankAccountName: "",
    addresses: "",
    bankName: "",
    transferAmount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPayment((prevComplaint) => ({
      ...prevComplaint,
      [name]: name === "transferAmount" && /^\d+$/.test(value) ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when submitting
      newPayment.name = userData.name;
      newPayment.userId = userData.id;
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/payment/payment.handler`, {
        method: "POST",
        body: JSON.stringify(newPayment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.payment);
        onClose();
        onFormSubmit(); // Notify the parent component about the form submission
      } else {
        const errorData = await res.json();
        alert(`Payment submission failed. Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred while submitting the Payment:", error);
      alert("Payment submission failed. Please try again.");
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
        top="5%"
        m={4}>
        <ModalHeader mt={4}>Formulir Pembayaran</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text
            fontWeight="bold"
            fontSize="18"
            mb={2} // You can adjust the margin-bottom as needed
          >
            Silahkan transfer ke rekening berikut sesuai dengan nominal yang anda terima
          </Text>

          <Text
            fontWeight="bold"
            fontSize="18"
            color="primary.500" // You can use your preferred color
          >
            BCA: 0201720540
          </Text>

          <Text
            fontWeight="bold"
            fontSize="18"
            color="primary.500" // You can use your preferred color
          >
            A/N: Wiliam Kurniawan
          </Text>

          <FormControl mt={4}>
            <FormLabel>Nama Akun Bank</FormLabel>
            <Input
              type="text"
              name="bankAccountName"
              value={newPayment.bankAccountName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Nama Bank</FormLabel>
            <Select
              name="bankName"
              value={newPayment.bankName}
              onChange={handleInputChange}>
              <option
                value=""
                disabled
                hidden>
                -- Pilih Nama Bank --
              </option>
              {banks.map((bank) => (
                <option
                  key={bank.value}
                  value={bank.value}>
                  {bank.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Transfer Nominal</FormLabel>
            <Input
              name="transferAmount"
              type="text"
              value={newPayment.transferAmount}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Alamat</FormLabel>
            <Input
              name="addresses"
              type="text"
              value={newPayment.addresses}
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

export default PaymentForm;
