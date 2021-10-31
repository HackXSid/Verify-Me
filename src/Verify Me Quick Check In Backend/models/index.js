"use strict";

const { applyExtraSetup } = require("./association");

const sequelize = require("./database");

const modelDefiners = [
  require("./user.model"),
  require("./hospitality.model"),
  require("./service.model"),
  require("./token.model"),
  require("./ekyc.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
applyExtraSetup(sequelize);

module.exports = sequelize;
