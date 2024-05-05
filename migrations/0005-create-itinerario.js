"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Itinerarios", {
      itinerarioId: {
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
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Usuarios",
          key: "userId",
        },
      },
      gastoTotal: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      kmTotal: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Itinerarios");
  },
};
