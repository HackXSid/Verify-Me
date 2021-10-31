const sequelize = require("../models/index");
const { nanoid } = require("nanoid");

const { service, hospitality } = sequelize.models;

const createService = async (
  name,
  date_of_avail,
  type_of_auth,
  userId,
  hospitalityAppId,
  description = ""
) => {
  await service.create({
    name,
    date_of_avail,
    type_of_auth,
    description,
    userId,
    hospitalityAppId,
    id: nanoid(20),
  });
};

const deleteService = async (id) => {
  await service.destroy({
    where: {
      id,
    },
  });
};

const getServiceForUsers = async (userId) => {
  const services = await service.findAll({
    where: {
      userId,
    },
    raw: true,
    include: [{ model: hospitality, nested: true }],
  });
  const filteredServices = services.map((service) => {
    const copy = service;
    delete copy["hospitalityAppId"];
    delete copy["hospitality.app_id"];
    delete copy["hospitality.app_secret"];
    delete copy["userId"];
    return copy;
  });
  return filteredServices;
};

const getServiceForHospitalities = async (hospitalityAppId) => {
  const services = await service.findAll({
    where: {
      hospitalityAppId,
    },
    raw: true,
  });
  const filteredServices = services.map((service) => {
    const copy = service;
    delete copy["hospitalityAppId"];
    delete copy["hospitality.app_id"];
    delete copy["hospitality.app_secret"];
    delete copy["userId"];
    return copy;
  });
  return filteredServices;
};

module.exports = {
  createService,
  deleteService,
  getServiceForUsers,
  getServiceForHospitalities,
};
