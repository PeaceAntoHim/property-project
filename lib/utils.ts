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

export const getCategoryLabel = (categoryValue: string) => {
  const category = categories.find((cat) => cat.value === categoryValue);
  return category ? category.label : "Unknown Category";
};
