'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Usuario, {foreignKey: 'userId'})
      this.hasMany(models.Itinerario, {foreignKey:'id'})
      this.hasMany(models.lugar, {foreignKey:'id'})
    }
  }
  Plan.init({
    initerarioID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Itinerarios',
        id: 'id'
      },

      lugarID: {
        type:  DataTypes.INTEGER,
        references:{
          model: 'lugar',
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
      descripcion: DataTypes.TEXT,
      horaLlegada: DataTypes.STRING,
      horaSalida: DataTypes.STRING,
      puntoPartida: DataTypes.STRING,
      motivo: DataTypes.TEXT,
      gastos: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};