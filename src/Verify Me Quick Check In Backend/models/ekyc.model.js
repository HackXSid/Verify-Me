"use strict";

const { nanoid } = require("nanoid");
const { DataTypes } = require("sequelize");
const { encrypt, decrypt } = require("../utils/security");

module.exports = (sequelize) => {
  sequelize.define("ekyc", {
    id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: nanoid(128),
      primaryKey: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        this.setDataValue("image", encrypt(value));
      },
      get() {
        return decrypt(this.getDataValue("image"));
      },
    },
  });
};
