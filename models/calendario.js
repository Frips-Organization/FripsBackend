"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Calendario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Plan, { foreignKey: "planId" });
    }

    static modelName = "Calendario";
  }

  Calendario.init(
    {
      calendarioId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      planId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Plans",
          key: "planId",
        },
      },
      actividadPlanificada: {
        type: DataTypes.TEXT,
      },
      fecha: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: Calendario.modelName,
      timestamps: false,
    }
  );
  return Calendario;
};
