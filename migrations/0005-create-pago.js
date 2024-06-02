"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pagos", {
      pagoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      initerarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Itinerarios",
          key: "itinerarioId",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Usuarios",
          key: "userId",
        },
      },
      porcentaje: {
        type: Sequelize.INTEGER,
      },
      monto: {
        type: Sequelize.INTEGER,
      },
      descr: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pagos");
  },
};
