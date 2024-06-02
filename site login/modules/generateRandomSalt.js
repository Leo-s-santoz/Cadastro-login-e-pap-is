function generateRandomSalt() {
  const charset =
    "abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 12; // Defina o comprimento da senha como 10 caracteres
  let salt = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    salt += charset[randomIndex];
  }
  return salt;
}

module.exports = generateRandomSalt;
