'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize) => {

    class Grupo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // define association here
        }

        static modelName = 'Grupo';
    }

    //Grupo es una tabla que contiene solo los nombres y el estado de cada grupo, pero no sus integrantes
    Grupo.init({
        grupoId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: Grupo.modelName,
        timestamps: false
    });
    return Grupo;
};