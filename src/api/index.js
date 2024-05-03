const user = require("./user/user");
const express = require("express");

const apiRouter = express.Router();

apiRouter.use(user);

module.exports = apiRouter;