'use strict';
const {
    Model, DataTypes
} = require('sequelize');

class Calendario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasMany(models.Plan, {foreignKey: 'id'})
    }
    static modelName = 'Calendario';
}

exports.Calendario = Calendario;
module.exports = (sequelize) => {
    Calendario.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        planID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Plans',
                key: 'id'
            }
        },
        actividadPlanificada: {
            type: DataTypes.TEXT
        },
        fecha: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: Calendario.modelName,
        timestamps: false
    });
    return Calendario;
};