const user = require("./user/user");
const lugar = require("./lugar/lugar");
const itinerario = require("./itinerario/itinerario");
const plan = require("./plan/plan");
const grupo = require("./grupo/grupo");
const grupoviaje = require("./grupoviaje/grupoviaje");
const express = require("express");

const apiRouter = express.Router();

//Esto es lo que funciona como router
apiRouter.use(user);
apiRouter.use(lugar);
apiRouter.use(itinerario);
apiRouter.use(plan);
apiRouter.use(grupo);
apiRouter.use(grupoviaje);

module.exports = apiRouter;