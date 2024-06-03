"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Plan extends Model {
    static associate(models) {
      // Definir las asociaciones aquí
      this.belongsTo(models.Usuario, { foreignKey: "userId" });
      this.belongsTo(models.Itinerario, { foreignKey: "itinerarioId" });
      this.hasOne(models.Lugar, {foreignKey: "planId",  onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasMany(models.Gasto, {foreignKey: "planId", onDelete: 'CASCADE'});
      this.belongsTo(models.Calendario, {
        foreignKey: "planId",
        allowNull: true,
      });
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
          model: "Itinerarios",
          key: "itinerarioId",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Usuarios",
          key: "userId",
        },
      },
      nombreLugar: {
        type: DataTypes.TEXT,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      horaLlegada: {
        type: DataTypes.TIME,
      },
      horaSalida: {
        type: DataTypes.TIME, // Cambiado a TIME para coincidir con la migración
      },
      puntoPartida: {
        type: DataTypes.STRING,
      },
      motivo: {
        type: DataTypes.TEXT,
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
