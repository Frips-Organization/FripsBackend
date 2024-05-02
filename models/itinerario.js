'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Itinerario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Usuario, {foreignKey: 'userId'})
      this.hasMany(models.GrupoViaje, {foreignKey: 'grupoViajeId'})
    }
  }
  Itinerario.init({
    grupoViajeId:{
      type: DataTypes.INTEGER,
      references:{
        model: 'GrupoViajes',
        key: 'grupoViajeId'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      notNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Usuarios',
        key: 'userId'
      }
    },
    gastoTotal: DataTypes.FLOAT,
    kmTotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Itinerario',
  });
  return Itinerario;
};