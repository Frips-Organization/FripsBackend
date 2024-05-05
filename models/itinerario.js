"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Itinerario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Usuario, { foreignKey: "userId" });
      this.hasMany(models.GrupoViaje, { foreignKey: "grupoViajeId" });
    }

    static modelName = "Itinerario";
  }

  Itinerario.init(
    {
      itinerarioId: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      grupoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Grupo",
          key: "grupoId",
        },
      },
      nombre: {
        type: DataTypes.STRING,
        notNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        notNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Usuario",
          key: "userId",
        },
      },
      //ojo, estoy permitiendo nulls, esto para poder calcular los gastos mas tarde
      gastoTotal: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      kmTotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: Itinerario.modelName,
      timestamps: false,
    }
  );
  return Itinerario;
};
