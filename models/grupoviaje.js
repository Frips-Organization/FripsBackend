'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrupoViaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       this.hasMany(models.Usuario, {foreignKey: 'userId'})

        this.hasMany(models.grupo, {foreignKey: 'grupoId'})
      // define association here

    }
  }
  GrupoViaje.init({
    grupoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Grupos',
        id: 'grupoId'
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        id: 'userId'
      }
    }
  }, {
    sequelize,
    modelName: 'GrupoViaje',
  });
  return GrupoViaje;
};
