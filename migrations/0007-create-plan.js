"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Planes", {
      planId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itinerarioId: {
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
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      horaLlegada: {
        type: Sequelize.TIME,
      },
      horaSalida: {
        type: Sequelize.TIME,
      },
      puntoPartida: {
        type: Sequelize.STRING,
      },
      motivo: {
        type: Sequelize.TEXT,
      },
      gastos: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        required: false,
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        required: false,
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Planes");
  },
};
