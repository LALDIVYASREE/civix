exports.isValidEmail = (email) => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

exports.isStrongPassword = (pwd) => {
  if (!pwd) return false;
  return pwd.length >= 6;
};
