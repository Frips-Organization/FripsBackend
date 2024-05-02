'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itinerarioID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Itinerarios',
          key: 'id'
        }
      },
      lugarID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lugar',
          key: 'id'
        }
      },
      usuarioID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'userId'
        }
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      horaLlegada: {
        type: Sequelize.STRING
      },
      horaSalida: {
        type: Sequelize.STRING
      },
      puntoPartida: {
        type: Sequelize.STRING
      },
      motivo: {
        type: Sequelize.TEXT
      },
      gastos: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        required: false,
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        required: false,
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plans');
  }
};