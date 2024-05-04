'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    class GrupoViaje extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Usuario, {foreignKey: 'userId'})
            this.hasMany(models.Grupo, {foreignKey: 'grupoId'})
            // define association here

        }

        static modelName = "GrupoViaje";
    }

    GrupoViaje.init({
        grupoViajeId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        grupoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Grupo,
                id: 'grupoId'
            }
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                id: 'userId'
            }
        }
    }, {
        sequelize,
        modelName: GrupoViaje.modelName,
        timestamps: false
    });
    return GrupoViaje;
};
