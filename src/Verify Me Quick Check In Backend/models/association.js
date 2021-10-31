"use strict";

const applyExtraSetup = (sequelize) => {
  const { hospitality, service, user, token } = sequelize.models;

  service.belongsTo(user, { constraints: false });
  user.hasMany(service, { onDelete: "cascade" });

  service.belongsTo(hospitality, { constraints: false });
  hospitality.hasMany(service, { onDelete: "cascade" });

  token.belongsTo(user, { constraints: false });
  user.hasMany(token, { onDelete: "cascade" });
};

module.exports = { applyExtraSetup };
