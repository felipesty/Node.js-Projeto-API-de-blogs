const userService = require('../service/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { message, code, token } = await 
    userService.validationUser(displayName, email, password, image);
  if (message) return res.status(code).json({ message });
  return res.status(code).json({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

module.exports = {
  createUser,
  getAll,
};