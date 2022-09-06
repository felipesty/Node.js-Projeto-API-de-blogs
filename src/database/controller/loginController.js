const loginService = require('../service/loginService');

const login = async (req, res) => {
  const { message, code, token } = await loginService.validationLogin(req.body);
  if (message) return res.status(code).json({ message });
  res.status(code).json({ token });
};

module.exports = {
  login,
};