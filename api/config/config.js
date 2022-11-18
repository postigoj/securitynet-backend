require("dotenv").config();

module.exports = {
  development: {
    username: null,
    password: null,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
