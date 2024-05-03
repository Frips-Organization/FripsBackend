'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calendario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Plan, {foreignKey: 'id'})
    }
  }
  Calendario.init({
    planID: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Plana',
        id: 'id'
      }
    },
    actividadPlanificada: DataTypes.TEXT,
    fecha: {type: DataTypes.DATE, allowNull: true, required: false}
  }, {
    sequelize,
    modelName: 'Calendario',
  });
  return Calendario;
};