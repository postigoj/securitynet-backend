"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const clients = [
      {
        name: "Carrefour",
        email: "carrefour@gmail.com",
        cuit: 48413841,
        legalAdress: "calle juan 1810",
        startContract: "20/10/2022",
        endContract: "20/10/2024",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Prosegur",
        email: "prosegur@gmail.com",
        cuit: 483152515,
        legalAdress: "calle corrientes 4810",
        startContract: "5/10/2022",
        endContract: "5/10/2024",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jumbo",
        email: "jumbo@gmail.com",
        cuit: 5831524515,
        legalAdress: "avenida directorio 4810",
        startContract: "10/08/2022",
        endContract: "10/08/2024",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("clients", clients, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("clients", null, {});
  },
};
