const express = require("express");
const {
  generateCaptcha,
  generateOtp,
  getEKYC,
  postEKYCImage,
  getEKYCImage,
} = require("../controllers/uidai.controller");

const router = express.Router();

router.get("/genCaptcha", generateCaptcha);
router.post("/getOtp", generateOtp);
router.post("/authenticate", getEKYC);
router.post("/ekyc", postEKYCImage);
router.get("/ekyc", getEKYCImage);

module.exports = { router };
