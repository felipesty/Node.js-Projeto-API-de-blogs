const categoryService = require('../service/categoryService');

const createCategory = async (req, res) => {
   const { name } = req.body;
   const { message, code, result } = await categoryService.createCategory(name);
   if (message) return res.status(code).json({ message });
   res.status(code).json(result);
};

const getAll = async (req, res) => {
  const { message, code, category } = await categoryService.getAll();
  if (message) return res.status(code).json({ message });
  res.status(code).json(category);
};

module.exports = {
  createCategory,
  getAll,
};