"use strict";

const { DataTypes } = require("sequelize");
const { getToken } = require("../utils/security");

module.exports = (sequelize) => {
  sequelize.define("token", {
    id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: getToken(),
      primaryKey: true,
    },
  });
};
