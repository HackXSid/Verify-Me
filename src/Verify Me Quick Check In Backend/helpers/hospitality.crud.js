const sequelize = require("../models/index");

const { hospitality } = sequelize.models;

const createHospitality = async (name, url) => {
  await hospitality.create({
    name,
    url,
  });
};

const deleteHospitality = async (app_id) => {
  await hospitality.destroy({ where: { app_id } });
};

const getHospitality = async (app_id) => {
  return await hospitality.findByPk(app_id, { raw: true });
};

module.exports = { createHospitality, deleteHospitality, getHospitality };
