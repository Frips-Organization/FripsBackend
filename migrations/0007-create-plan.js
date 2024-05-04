'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Planes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            itinerario: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Itinerarios",
                    key: 'itinerario_id'
                }
            },
            lugarID: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Lugares",
                    key: 'id'
                }
            },
            usuarioID: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Usuarios",
                    key: 'userId'
                }
            },
            descripcion: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            horaLlegada: {
                type: Sequelize.DATE
            },
            horaSalida: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('Planes');
    }
};