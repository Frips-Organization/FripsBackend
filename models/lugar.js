"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Lugar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Plan, {foreignKey: "planId", onDelete: 'CASCADE',  onUpdate: 'CASCADE'});
    }

    static modelName = "Lugar";
  }

  Lugar.init(
    {
      lugarId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      planId: {
        type: DataTypes.INTEGER,
        references: {
          models: "Planes",
          key: "planId",
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ubicacion: DataTypes.STRING,
      coordenadas: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Lugares",
      modelName: Lugar.modelName,
      timestamps: false,
    }
  );

  return Lugar;
};
