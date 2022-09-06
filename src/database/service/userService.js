const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const validationUser = async (displayName, email, password, image) => {
  if (displayName.length < 8) {
    return { code: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  const re = /\S+@\S+\.\S+/;
  if (!(re.test(email))) return { code: 400, message: '"email" must be a valid email' };
  if (password.length < 6) {
    return { code: 400, message: '"password" length must be at least 6 characters long' };
  }
  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    return { code: 409, message: 'User already registered' };
  }

  const result = await User.create({ displayName, email, password, image });
  const { id } = result;
  const token = jwt.sign({ id, email, displayName, image },
    JWT_SECRET, { expiresIn: '8h', algorithm: 'HS256' });
  return { code: 201, token };
};

const getAll = async () => {
  const user = await User.findAll({ attributes: { exclude: ['password'] } });
  return { code: 200, user };
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) return { code: 404, message: 'User does not exist' };
  return { code: 200, user };
};

module.exports = {
  validationUser,
  getAll,
  getById,
};