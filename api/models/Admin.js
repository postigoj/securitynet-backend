const S = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");
const validateToken = require('../config/token')

class Admin extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Admin.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
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
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    
    salt: {
      type: S.STRING,
    },

    resetToken: {
      type: S.STRING,
    }
   
  },
  { sequelize: db, modelName: "admin" }
);

Admin.beforeCreate(async (admin) => {
  const salt = bcrypt.genSaltSync();
  admin.salt = salt;
  const hash = await admin.hash(admin.password, salt)
  return admin.password = hash;

});

module.exports = Admin;