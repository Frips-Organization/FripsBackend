import  Sequelize  from "sequelize";

export const sequelize = new Sequelize('fripsDB','postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
  });