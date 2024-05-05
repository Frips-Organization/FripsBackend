const express = require("express");
const db = require("../../../models");
const { GrupoViaje } = require("../../../models");
const grupo = require("../../../models/grupo");

const router = express.Router();

//router.get() hay que hacer un get por ID

//Este post sirve para agregar un usuario a un grupo
router.post("/grupoviaje", async (req, res, next) => {
  let { grupoId, userId } = req.body;
  try {
    await GrupoViaje.create({
      grupoId: grupoId,
      userId: userId,
    })
      .then((data) => {
        res.status(201).send("Created");
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    console.log(error.message);
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
