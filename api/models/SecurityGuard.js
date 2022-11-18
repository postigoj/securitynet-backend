const S = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class SecurityGuard extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password) {
    console.log(this.salt, 'esto es el thissalt')
    const newHash = await this.hash(password, this.salt);
    console.log(newHash, 'este es el newhash')
    console.log(this.password, 'este es el password')
    return newHash === this.password;
  }

  validateResetToken(resetToken) {
    return this.resetToken ? true : false;
  }
}

SecurityGuard.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    workingHours: {
      // ver de que tipo de dato se necesitaria por ahora queda string pereo tal vez sea integer
      type: S.STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    totalWorkedHours: {
      type: S.BIGINT,
      defaultValue: 0,
    },
    cuil: {
      type: S.BIGINT,
      isUnique: true,
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
    phone: {
      type: S.BIGINT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    isActive: {
      type: S.BOOLEAN,
      defaultValue: true, //con la logica de que si lo registramos, esta disponible como para trabajar
    },
    isWorking: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    adress: {
      type: S.STRING,
      allowNull: true,
    },
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
    startContract: {
      type: S.DATE,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    endContract: {
      type: S.DATE,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    salt: {
      type: S.STRING,
    },
    resetToken: {
      type: S.STRING,
    },

    code: {
      type: S.STRING,
    },

    reseted: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "securityguard" }
);

SecurityGuard.beforeCreate(async (securityGuard) => {
  const salt = bcrypt.genSaltSync();
  securityGuard.salt = salt;
  const hash = await securityGuard.hash(securityGuard.password, salt);
  return (securityGuard.password = hash);
});

module.exports = SecurityGuard;
