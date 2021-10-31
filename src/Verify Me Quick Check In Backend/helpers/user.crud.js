const sequelize = require("../models/index");
const CryptoJS = require("crypto-js");

const { user } = sequelize.models;

const hash = (text) => {
  return CryptoJS.SHA3(text, { outputLength: 256 }).toString();
};

const findOrCreateByUser = async (aadhar) => {
  const [usr, _] = await user.findOrCreate({
    where: { id: hash(aadhar) },
    raw: true,
  });
  return usr;
};

const findOrCreateByHospitality = async (id) => {
  const [usr, _] = await user.findOrCreate({
    where: { id },
    raw: true,
  });
  return usr;
};

const getUser = async (id) => {
  return await user.findByPk(id, { raw: true });
};

module.exports = {
  hash,
  findOrCreateByUser,
  findOrCreateByHospitality,
  getUser,
};
