'use strict';
const {
    Model, DataTypes
} = require('sequelize');

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

exports.Grupo = Grupo;

module.exports = (sequelize) => {

    Grupo.init({
        grupoId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        },
        estado: DataTypes.TEXT
    }, {
        sequelize,
        modelName: Grupo.modelName,
        timestamps: false
    });
    return Grupo;
};