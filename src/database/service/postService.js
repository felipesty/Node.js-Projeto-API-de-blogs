const { User, BlogPost, Category } = require('../models');

const getAll = async () => {
  const post = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { code: 200, post };
};

module.exports = { getAll };