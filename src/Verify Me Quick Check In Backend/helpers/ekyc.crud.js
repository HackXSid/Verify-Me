const { nanoid } = require("nanoid");
const sequelize = require("../models/index");

const { ekyc } = sequelize.models;

const create = async (image) => {
  const entry = await ekyc.create({ image, id: nanoid(128) });
  return entry.dataValues;
};

const get = async (id) => {
  const entry = await ekyc.findByPk(id);
  if (!entry) return {};
  const data = entry.get();
  if (Math.abs(new Date() - new Date(data.createdAt)) / 3.6e6 > 4) {
    // Time difference is more than 4 hours
    return {};
  }
  return data;
};

module.exports = { create, get };
