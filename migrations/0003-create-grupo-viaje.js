"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GrupoViajes", {
      grupoViajeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      grupoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Grupos",
          key: "grupoId",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Usuarios",
          key: "userId",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GrupoViajes");
  },
};
