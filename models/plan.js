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
      //NOTA: creo que realmente plan no necesita  tener un userId
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
          model: "Itinerario",
          key: "itinerarioId",
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Usuario",
            key: "userId",
          },
        },
        nombreLugar: {
          type: DataTypes.TEXT
        },
        descripcion:{
          type: DataTypes.TEXT,
          allowNull: false
        },
        horaLlegada: DataTypes.TIME,
        horaSalida: DataTypes.DATE,
        puntoPartida: DataTypes.STRING,
        motivo: {
          type: DataTypes.TEXT,
          allowNull: true
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
    },
    {
      sequelize,
      modelName: Plan.modelName,
      tableName: "Planes",
    }
  );
  return Plan;
};
