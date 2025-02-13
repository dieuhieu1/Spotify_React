export const validateEmail = (email) => {
  // Biểu thức chính quy kiểm tra định dạng email
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};
