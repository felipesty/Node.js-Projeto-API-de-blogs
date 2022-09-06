const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const token = (req, res, next) => {
  try {
    const validation = req.headers.authorization;
    if (!validation) return res.status(401).json({ message: 'Token not found' });
    const decode = jwt.verify(validation, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { token };