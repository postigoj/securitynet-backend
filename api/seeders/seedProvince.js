"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const provincias = [
      {
        id: 1,
        name: "Buenos Aires",
      },
      {
        id: 2,
        name: "Ciudad Autónoma de Buenos Aires",
      },
      {
        id: 3,
        name: "Catamarca",
      },
      {
        id: 4,
        name: "Chaco",
      },
      {
        id: 5,
        name: "Chubut",
      },
      {
        id: 6,
        name: "Córdoba",
      },
      {
        id: 7,
        name: "Corrientes",
      },
      {
        id: 8,
        name: "Entre Rios",
      },
      {
        id: 9,
        name: "Formosa",
      },
      {
        id: 10,
        name: "Jujuy",
      },
      {
        id: 11,
        name: "La Pampa",
      },
      {
        id: 12,
        name: "La Rioja",
      },
      {
        id: 13,
        name: "Mendoza",
      },
      {
        id: 14,
        name: "Misiones",
      },
      {
        id: 15,
        name: "Neuquén",
      },
      {
        id: 16,
        name: "Rio Negro",
      },
      {
        id: 17,
        name: "Salta",
      },
      {
        id: 18,
        name: "San Juan",
      },
      {
        id: 19,
        name: "San Luis",
      },
      {
        id: 20,
        name: "Santa Cruz",
      },
      {
        id: 21,
        name: "Santa Fe",
      },
      {
        id: 22,
        name: "Santiago del Estero",
      },
      {
        id: 23,
        name: "Tierra del Fuego",
      },
      {
        id: 24,
        name: "Tucumán",
      },
    ];

    await queryInterface.bulkInsert("provincias", provincias, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     *
     */
    await queryInterface.bulkDelete("provincias", null, {});
  },
};
