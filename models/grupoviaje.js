"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class GrupoViaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Usuario, { foreignKey: "userId" });
      this.hasMany(models.Grupo, { foreignKey: "grupoId" });
      // define association here
    }

    static modelName = "GrupoViaje";
  }

  //Grupo viaje es la tabla que contiene todos los usuarios y los grupos a los que pertenecen
  GrupoViaje.init(
    {
      grupoViajeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      grupoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Grupo",
          key: "grupoId",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Usuario",
          key: "userId",
        },
      },
    },
    {
      sequelize,
      modelName: GrupoViaje.modelName,
      timestamps: false,
    }
  );
  return GrupoViaje;
};
