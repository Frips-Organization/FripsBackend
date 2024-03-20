module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      nombre: DataTypes.STRING,
      email: DataTypes.STRING
    });
    return Usuario;
  };
  