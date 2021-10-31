"use strict";

const { DataTypes } = require("sequelize");
const { nanoid } = require("nanoid");
const { AUTH_TYPE } = require("../constants");

module.exports = (sequelize) => {
  sequelize.define("service", {
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: nanoid(20),
      primaryKey: true,
    },
    date_of_booking: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
    },
    date_of_avail: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type_of_auth: {
      type: DataTypes.STRING,
      validate: {
        isIn: [AUTH_TYPE],
      },
    },
  });
};
