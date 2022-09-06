const postService = require('../service/postService');

const getAll = async (_req, res) => {
  const { code, post } = await postService.getAll();
  res.status(code).json(post);
};

module.exports = { getAll };