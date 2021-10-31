const {
  createService,
  deleteService,
  getServiceForHospitalities,
  getServiceForUsers,
} = require("../helpers/service.crud");
const { deleteToken } = require("../helpers/token.crud");

const createServiceController = async (req, res) => {
  const { name, date_of_avail, type_of_auth, description } = req.body;
  const { hospitality, token } = req;
  await createService(
    name,
    date_of_avail,
    type_of_auth,
    token.userId,
    hospitality.app_id,
    description
  );
  await deleteToken(token.id);
  res.send({ success: true });
};

const deleteServiceController = async (req, res) => {
  const { id } = req.body;
  await deleteService(id);
  res.send({ success: true });
};

const getServiceForUsersController = async (req, res) => {
  const { user } = req;
  const services = await getServiceForUsers(user.id);
  res.send({ services });
};

const getServiceForHospitalitiesController = async (req, res) => {
  const { hospitality } = req;
  const services = await getServiceForHospitalities(hospitality.app_id);
  res.send({ services });
};

module.exports = {
  createServiceController,
  deleteServiceController,
  getServiceForHospitalitiesController,
  getServiceForUsersController,
};
