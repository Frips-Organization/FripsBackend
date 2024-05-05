"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Calendarios", {
      calendarioId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      planId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Planes",
          key: "planId",
        },
      },
      actividadPlanificada: {
        type: Sequelize.TEXT,
      },
      fecha: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Calendarios");
  },
};
