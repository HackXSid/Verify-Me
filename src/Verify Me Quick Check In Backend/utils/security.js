const { customAlphabet } = require("nanoid");
const CryptoJS = require("crypto-js");

const custNanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);

const getToken = () => {
  return custNanoid();
};

require("dotenv").config();
const secretKey = process.env.SECRET_KEY || "random@123";

const encrypt = (text) => CryptoJS.AES.encrypt(text, secretKey).toString();

const decrypt = (text) =>
  CryptoJS.AES.decrypt(text, secretKey).toString(CryptoJS.enc.Utf8);

module.exports = { getToken, encrypt, decrypt };
