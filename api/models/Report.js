const S = require("sequelize");
const db = require("../db/index");

class Report extends S.Model {}

Report.init(
  {
    latitude: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    longitude: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    workedHours: {
      type: S.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    isInRange: {
        type: S.BOOLEAN,
      },
    hour: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "report" }
);

module.exports = Report;
