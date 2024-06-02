const user = require("./user/user");
const lugar = require("./lugar/lugar");
const gasto = require("./gasto/gasto")
const itinerario = require("./itinerario/itinerario");
const plan = require("./plan/plan");
const grupo = require("./grupo/grupo");
const grupoviaje = require("./grupoviaje/grupoviaje");
const cloud = require("./cloud/cloud");
const express = require("express");

const apiRouter = express.Router();

//Esto es lo que funciona como router

apiRouter.use(user);
apiRouter.use(lugar);
apiRouter.use(gasto);
apiRouter.use(itinerario);
apiRouter.use(plan);
apiRouter.use(grupo);
apiRouter.use(grupoviaje);
apiRouter.use(cloud);

module.exports = apiRouter;
