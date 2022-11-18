const S = require("sequelize");
const db = require("../db/index");

class Province extends S.Model {}

Province.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize: db, modelName: "provincias", timestamps: false }
);

module.exports = Province;
