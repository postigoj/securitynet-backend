const S = require("sequelize");
const db = require("../db/index");

class Event extends S.Model {}

Event.init(
  {
    date: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    start: {
      type: S.STRING, //pensar que clase de dato se guardaria en esa fila de la tabla calendario ver si se usa horas o date
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    end: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize: db, modelName: "event" }
);

module.exports = Event;
