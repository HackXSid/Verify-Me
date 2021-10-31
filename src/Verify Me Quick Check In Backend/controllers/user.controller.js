const { findOrCreateByUser } = require("../helpers/user.crud");
const { createToken, deleteToken } = require("../helpers/token.crud");

const getUserController = async (req, res) => {
  const { aadhar } = req.body;
  const user = await findOrCreateByUser(aadhar);
  res.send({ user });
};

const getTokenController = async (req, res) => {
  const { aadhar } = req.body;
  const user = await findOrCreateByUser(aadhar);
  const token = await createToken(user.id);
  res.send({ token: token.id });
};

module.exports = { getUserController, getTokenController };
