export function validateEmail(param: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(param);
}

export const categories = [
  { value: "security", label: "Keamanan" },
  { value: "cleanliness", label: "Kebersihan" },
  { value: "water", label: "Air" },
  { value: "electricity", label: "Listrik" },
  { value: "facilities", label: "Fasilitas" },
  { value: "permitsOrEvent", label: "Izin atau Event" },
];

export const banks = [
  { value: "BCA", label: "Bank Central Asia" },
  { value: "BRI", label: "Bank Rakyat Indonesia" },
  { value: "BNI", label: "Bank Negara Indonesia" },
  { value: "CIMB", label: "CIMB Niaga" },
  { value: "Mandiri", label: "Bank Mandiri" },
  { value: "BTN", label: "Bank Tabungan Negara" },
  { value: "HSBC", label: "HSBC Indonesia" },
  { value: "Maybank", label: "Maybank Indonesia" },
  { value: "Danamon", label: "Bank Danamon" },
  { value: "Panin", label: "Bank Panin" },
];

export const getCategoryLabel = (categoryValue: string) => {
  const category = categories.find((cat) => cat.value === categoryValue);
  return category ? category.label : "Unknown Category";
};

export const getCategoryBank = (categoryValue: string) => {
  const category = banks.find((cat) => cat.value === categoryValue);
  return category ? category.label : "Unknown Category";
};

export const formatDateTime = (date: Date): string => {
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

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export const formatAgreement = (param: boolean) => {
  if (param) {
    return "Setuju";
  }
  ("Tidak Setuju");
};
