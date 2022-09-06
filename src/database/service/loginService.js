const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const validationLogin = async ({ email, password }) => {
  if (!email || !password) {
    return { code: 400, message: 'Some required fields are missing' };
  }
  const result = await User.findOne({ where: { email } });
  if (!result) return { code: 400, message: 'Invalid fields' };
  if (result.dataValues.password !== password) return { code: 400, message: 'Invalid fields' };

  const token = jwt.sign({ data: email }, JWT_SECRET, { expiresIn: '8h', algorithm: 'HS256' });
  return { code: 200, token };
};

module.exports = {
  validationLogin,
};