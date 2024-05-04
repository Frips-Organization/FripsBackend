'use strict';
const {
    Model, DataTypes
} = require('sequelize');

class Lugar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }

    static modelName = "Lugar";
}

exports.Lugar = Lugar;

module.exports = (sequelize) => {

    Lugar.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        ubicacion: DataTypes.STRING,
        coordenadas: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Lugares',
        modelName: Lugar.modelName,
        timestamps: false
    });

    return Lugar;
};