const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

 const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports  = { hashPassword, comparePassword }

//-----------conform password------------------------\\
const hashconformPassword = async (conformPassword) => {
  try {
    const saltRounds = 10;
    const hashedconformPassword = await bcrypt.hash(conformPassword, saltRounds);
    return hashedconformPassword;
  } catch (error) {
    console.log(error);
  }
};

//  const compareconformPassword = async (conformpassword, hashedconformPassword) => {
//   return bcrypt.compare(conformpassword, hashedconformPassword);
// };

module.exports  = { hashPassword, comparePassword, hashconformPassword, }