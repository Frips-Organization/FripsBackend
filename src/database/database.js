
const  Sequelize = require("sequelize")
const db = require("/models/index.js")


export const sequelize = db.sequelize.authenticate();
