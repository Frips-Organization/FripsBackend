'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
    }
  }
  Grupo.init({
    grupoId: DataTypes.INTEGER,
    nombre:{
      type: DataTypes.STRING,
      validate:{
        allowNull: false
      }
    },
    estado: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'grupo',
  });
  return Grupo;
};