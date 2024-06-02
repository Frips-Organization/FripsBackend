"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Gastos", {
            gastoId: {
                allowNull: true,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            planId:{
                type: Sequelize.INTEGER,
                references:{
                  model: "Planes",
                  key: "planId",
                }
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                  model: "Usuarios",
                  key: "userId",
                },
            },
            monto:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            motivo:{
                type: Sequelize.STRING,
            }   
        });  
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Gastos");
      },
};