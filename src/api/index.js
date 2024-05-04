const user = require("./user/user");
const lugar = require("./lugar/lugar")
const express = require("express");

const apiRouter = express.Router();

apiRouter.use(user);
apiRouter.use(lugar);

module.exports = apiRouter;