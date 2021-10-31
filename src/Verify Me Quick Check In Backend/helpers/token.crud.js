const sequelize = require("../models/index");
const { getToken } = require("../utils/security");

const { token } = sequelize.models;

const createToken = async (userId) => {
  const genToken = await token.create({ id: getToken(), userId });
  return genToken.dataValues;
};

const getTokenById = async (id) => {
  return await token.findByPk(id, { raw: true });
};

const deleteToken = async (id) => {
  await token.destroy({ where: { id } });
};

module.exports = { createToken, deleteToken, getTokenById };
