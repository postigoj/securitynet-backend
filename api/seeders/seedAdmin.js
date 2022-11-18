"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const admin = [
      {
        name: "admin",
        role: "SUDO",
        email: "admin@admin.com",
        password:
          "$2b$10$3HOUYD4MRZVnAq4gy4DwVOhdIiug22k.rLG0sm5MpverYb31WkyBO",
        salt: "$2b$10$3HOUYD4MRZVnAq4gy4DwVO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("admins", admin, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};
