const express = require("express");
const {
  getServiceForUsersController,
} = require("../controllers/service.controller");
const {
  getUserController,
  getTokenController,
} = require("../controllers/user.controller");
const { findOrCreateByUser } = require("../helpers/user.crud");

const router = express.Router();

const verifyUserMiddleware = async (req, res, next) => {
  const { aadhar } = req.body;
  if (!aadhar) {
    res.status(401).send({ message: "Not Authorized" });
    return;
  }
  const user = await findOrCreateByUser(aadhar);
  req.user = user;
  next();
};

router.use("/", verifyUserMiddleware);

router.post("/service", getServiceForUsersController);
router.post("/", getUserController);
router.post("/token", getTokenController);

module.exports = { router };
