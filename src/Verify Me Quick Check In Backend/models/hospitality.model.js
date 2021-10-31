"use strict";

const { DataTypes } = require("sequelize");
const { nanoid } = require("nanoid");

module.exports = (sequelize) => {
  sequelize.define("hospitality", {
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    app_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: nanoid(20),
      primaryKey: true,
    },
    app_secret: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: nanoid(30),
    },
    url: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  });
};
