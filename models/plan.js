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
      // Define associations here
      this.belongsTo(models.Usuario, { foreignKey: "userId" });
      this.belongsTo(models.Itinerario, { foreignKey: "itinerarioId" });
      this.belongsTo(models.Calendario, { foreignKey: "planId", allowNull: true });
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
          model: "Itinerarios", // Nombre correcto de la tabla
          key: "itinerarioId",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Usuarios", // Nombre correcto de la tabla
          key: "userId",
        },
      },
      nombreLugar: {
        type: DataTypes.STRING,
        allowNull: false, // Dependiendo de los requerimientos
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      horaLlegada: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      horaSalida: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      puntoPartida: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      motivo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
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
    {
      sequelize,
      modelName: Plan.modelName,
      tableName: "Planes",
      timestamps: true, // Para habilitar createdAt y updatedAt
    }
  );
  
  return Plan;
};
