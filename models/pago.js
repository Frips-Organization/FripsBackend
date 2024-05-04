'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    class Pago extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Usuario, {foreignKey: 'userId'})
            this.hasMany(models.Itinerario, {foreignKey: 'id'})
        }

        static modelName = "Pago";
    }

    Pago.init({
        pagoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        initerarioID: {
            type: DataTypes.INTEGER,
            references: {
                model: Itinerario,
                id: 'itinerario_id'
            }
        },
        usuarioID: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                id: 'userId'
            }
        },
        porcentaje: DataTypes.INTEGER,
        monto: DataTypes.INTEGER,
        descr: DataTypes.TEXT,
        createdAt: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: Pago.modelName,
    });

    return Pago;
};