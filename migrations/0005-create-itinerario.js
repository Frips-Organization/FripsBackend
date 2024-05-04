'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Itinerarios', {
            itinerario_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            grupoViajeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "GrupoViajes",
                    key: 'grupoViajeId'
                }
            },
            fecha: {
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Usuarios",
                    key: 'userId'
                }
            },
            gastoTotal: {
                type: Sequelize.FLOAT
            },
            kmTotal: {
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Itinerarios');
    }
};