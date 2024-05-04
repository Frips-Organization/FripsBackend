'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Calendarios', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            planID: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Planes",
                    key: 'id'
                }
            },
            actividadPlanificada: {
                type: Sequelize.TEXT
            },
            fecha: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Calendarios');
    }
};