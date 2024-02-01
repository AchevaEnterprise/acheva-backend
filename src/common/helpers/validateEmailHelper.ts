const validateEmail = async (email: string) => {
  const regex = /^[^\s@]+@futo\.edu\.ng$/;
  return regex.test(email);
};

export { validateEmail };
