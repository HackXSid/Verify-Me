const express = require("express");
const { getHospitality } = require("../helpers/hospitality.crud");
const {
  createServiceController,
  deleteServiceController,
  getServiceForHospitalitiesController,
} = require("../controllers/service.controller");
const { getTokenById } = require("../helpers/token.crud");

const router = express.Router();

const verifyCredentialMiddleware = async (req, res, next) => {
  let appId, appSecret, token;
  if (req.method === "GET") {
    appId = req.query.appId;
    appSecret = req.query.appSecret;
    token = req.query.token;
  } else {
    appId = req.body.appId;
    appSecret = req.body.appSecret;
    token = req.body.token;
  }
  if (!appId || !appSecret || !token) {
    res.status(401).send({ message: "Not Authorized" });
  } else {
    const hospitality = await getHospitality(appId);
    if (!hospitality) {
      res.status(401).send({ message: "Not Authorized" });
      return;
    }
    const db_appSecret = hospitality.app_secret;
    if (appSecret !== db_appSecret) {
      res.status(401).send({ message: "Not Authorized" });
      return;
    }
    const genToken = await getTokenById(token);
    if (!genToken) {
      res.status(401).send({ message: "Invalid Token" });
      return;
    }
    req.hospitality = hospitality;
    req.token = genToken;
    next();
  }
};

router.use("/", verifyCredentialMiddleware);

router.post("/create", createServiceController);
router.post("/delete", deleteServiceController);
router.get("/", getServiceForHospitalitiesController);

module.exports = { router };
