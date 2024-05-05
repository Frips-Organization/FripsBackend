const express = require("express");
const db = require("../../../models");
const { Plan } = require("../../../models");

const router = express.Router();

//post plan
router.post("/plan", async (req, res, next) => {
  let {
    itinerarioId,
    lugarId,
    userId,
    descripcion,
    horaLlegada,
    horaSalida,
    puntoPartida,
    motivo,
    gastos,
  } = req.body;
  //let createdAt pueden ser null y definirse despues
  //let updatedAt

  try {
    await Plan.create({
      itinerarioId,
      lugarId,
      userId,
      descripcion,
      horaLlegada,
      horaSalida,
      puntoPartida,
      motivo,
      gastos,
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
