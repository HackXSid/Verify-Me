const { default: axios } = require("axios");
const { create, get } = require("../helpers/ekyc.crud");
const { v4: uuidv4 } = require("uuid");

const generateCaptcha = async (_, res) => {
  const uidaiURL =
    "https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha";

  const postData = {
    langCode: "en",
    captchaLength: "3",
    captchaType: "2",
  };

  const response = await axios.post(uidaiURL, postData);
  const { data } = response;
  res.send(data);
};

const generateOtp = async (req, res) => {
  const uidaiURL =
    "https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp";

  const { uidNumber, captchaTxnId, captchaValue } = req.body;

  const request_id = uuidv4();

  const postData = {
    uidNumber,
    captchaTxnId,
    captchaValue,
    transactionId: `MYAADHAAR:${request_id}`,
  };

  let config = {
    headers: {
      "x-request-id": request_id,
      appid: "MYAADHAAR",
      "Accept-Language": "en_in",
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(uidaiURL, postData, config);
  const { data } = response;
  res.send(data);
};

const getEKYC = async (req, res) => {
  const uidaiURL = "https://stage1.uidai.gov.in/onlineekyc/getEkyc/";

  const { uid, txnId, otp } = req.body;

  const postData = {
    uid,
    txnId,
    otp,
  };

  const response = await axios.post(uidaiURL, postData);
  const { data } = response;
  res.send(data);
};

const postEKYCImage = async (req, res) => {
  const { image } = req.body;
  const info = await create(image);
  res.send(info);
};

const getEKYCImage = async (req, res) => {
  const { id } = req.query;
  const info = await get(id);
  res.send(info);
};

module.exports = {
  generateCaptcha,
  generateOtp,
  getEKYC,
  postEKYCImage,
  getEKYCImage,
};
