"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Usuario, { foreignKey: "userId" });
      this.hasOne(models.Itinerario, { foreignKey: "itinerarioId" });
      this.hasOne(models.Lugar, { foreignKey: "lugarId" });
    }

    static modelName = "Plan";
  }

  Plan.init(
    {
      planId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      itinerarioId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Itinerario",
          key: "itinerarioId",
        },

        lugarId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Lugar",
            key: "lugarId",
          },
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Usuario",
            key: "userId",
          },
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
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
    },
    {
      sequelize,
      modelName: Plan.modelName,
      tableName: "Planes",
    }
  );
  return Plan;
};
