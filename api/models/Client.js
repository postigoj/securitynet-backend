const S = require("sequelize");
const db = require("../db/index");

class Client extends S.Model {}

Client.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: S.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    cuit: {
      type: S.BIGINT,
      isUnique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    legalAdress: {
      type: S.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    startContract: {
      type: S.DATE,
      allowNull: true,
    },
    endContract: {
      type: S.DATE,
      allowNull: true,
    },

    isActive: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: db, modelName: "client" }
);

module.exports = Client;
