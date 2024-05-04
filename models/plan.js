'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    class Plan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Usuario, {foreignKey: 'userId'})
            this.hasOne(models.Itinerario, {foreignKey: 'id'})
            this.hasOne(models.Lugar, {foreignKey: 'id'})
        }

        static modelName = "Plan";
    }

    Plan.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        itinerario: {
            type: DataTypes.INTEGER,
            references: {
                model: Itinerario,
                id: 'itinerario_id'
            },

            lugarID: {
                type: DataTypes.INTEGER,
                references: {
                    model: Lugar,
                    id: 'id'
                }
            },
            usuarioID: {
                type: DataTypes.INTEGER,
                references: {
                    model: Usuario,
                    id: 'userId'
                }
            },
            descripcion: DataTypes.TEXT,
            horaLlegada: DataTypes.DATE,
            horaSalida: DataTypes.DATE,
            puntoPartida: DataTypes.STRING,
            motivo: DataTypes.TEXT,
            gastos: DataTypes.INTEGER,
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
        }
    }, {
        sequelize,
        modelName: Plan.modelName,
        tableName: "Planes"
    });
    return Plan;
};