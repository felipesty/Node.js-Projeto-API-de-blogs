const userService = require('../service/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { message, code, token } = await 
    userService.validationUser(displayName, email, password, image);
  if (message) return res.status(code).json({ message });
  return res.status(code).json({ token });
};

const getAll = async (_req, res) => {
  const { user, code } = await userService.getAll();
  return res.status(code).json(user);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { message, code, user } = await userService.getById(id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(user);
};

module.exports = {
  createUser,
  getAll,
  getById,
};