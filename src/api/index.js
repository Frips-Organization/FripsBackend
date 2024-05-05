const user = require("./user/user");
const lugar = require("./lugar/lugar");
const itinerario = require("./itinerario/itinerario");
const plan = require("./plan/plan");
const express = require("express");

const apiRouter = express.Router();

apiRouter.use(user);
apiRouter.use(lugar);
apiRouter.use(itinerario);
apiRouter.use(plan);

module.exports = apiRouter;