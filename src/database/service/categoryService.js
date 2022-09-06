const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };
  await Category.create({ name });
  const result = await Category.findOne({ where: { name } });
  return { code: 201, result };
};

const getAll = async () => {
  const category = await Category.findAll();
  return { code: 200, category };
};

module.exports = {
  createCategory,
  getAll,
};