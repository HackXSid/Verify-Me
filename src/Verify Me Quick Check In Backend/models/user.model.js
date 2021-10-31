"use strict";

const { DataTypes } = require("sequelize");
const { nanoid } = require("nanoid");

module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      type: DataTypes.STRING(512),
      allowNull: false,
      primaryKey: true,
    },
  });
};
