'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    class Usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

        static modelName = "Usuario";
    }


    Usuario.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true //Esta bien que esto sea null?
        },
        nombre: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: Usuario.modelName,
    });


    return Usuario;
};