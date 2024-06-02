"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    class Gasto extends Model {
        static associate(models) {
            this.belongsTo(models.Plan, {foreignKey: "planId"});
            this.belongsTo(models.Usuario, {foreignKey: "userId"});
          }
          static modelName = "Gasto";
    }

    Gasto.init(
        {
            gastoId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            planId: {
                type: DataTypes.INTEGER,
                references: {
                  models: "Planes",
                  key: "planId",
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                  model: "Usuarios",
                  key: "userId",
                },
            },
            monto:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            motivo:{
                type: DataTypes.STRING,
            }
        },
        {
            sequelize,
            tableName: "Gastos",
            modelName: Gasto.modelName,
            timestamps: false,  
        }
    );

    return Gasto;
};