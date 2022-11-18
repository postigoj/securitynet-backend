const S = require("sequelize");
const db = require("../db/index");


class BranchOffice extends S.Model {
  
}

BranchOffice.init(
  {
    latitude: {
      type: S.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },

    longitude: {
      type: S.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },

    adress: {
      type: S.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },

    isActive: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    
  },
  { sequelize: db, modelName: "branchoffice" }
);


module.exports = BranchOffice;