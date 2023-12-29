export function validateEmail(param: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(param);
}

console.info(validateEmail("test?gmail.com"));
console.info(validateEmail("test/gmail.com"));
console.info(validateEmail("test.gmail.com"));
console.info(validateEmail("test@gmail.c"));
console.info(validateEmail("test@gmail.comwwww"));
console.info(validateEmail("rabitechs@gmail.com"));
