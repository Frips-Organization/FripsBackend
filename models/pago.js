'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class pago extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Usuario, {foreignKey: 'userId'})
            this.hasMany(models.Itinerario, {foreignKey:'id'})
        }
    }

    pago.init({
        pagoID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        initerarioID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Itinerarios',
                id: 'id'
            }
        },
        usuarioID: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Usuarios',
                id: 'userId'
            }
        },
        porcentaje: DataTypes.INTEGER,
        monto: DataTypes.INTEGER,
        descr: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'pago',
    });
    return pago;
};