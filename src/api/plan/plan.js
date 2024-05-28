const express = require("express");
const db = require("../../../models");
const { Plan } = require("../../../models");
const {Lugar} = require("../../../models");
const router = express.Router();

//post plan
router.post("/plan", async (req, res) => {
  console.log("-------------REQUEST> ", req.body);
  const {
    itinerarioId,
    userId,
    nombreLugar,
    descripcion,
    horaLlegada,
    horaSalida,
    puntoPartida,
    motivo,
  } = req.body;
  //let createdAt pueden ser null y definirse despues
  //let updatedAt

  try {
     const plan = await Plan.create({
      itinerarioId,
      userId,
      nombreLugar,
      descripcion,
      horaLlegada,
      horaSalida,
      puntoPartida,
      motivo
     });

    //Aqui hace falta verificar que si el nombre del lugar ya
    //existe en la tabla "Lugar", entonces se salte la siguiente insercion

    const lugar = await Lugar.create({
      nombre : nombreLugar,
      descripcion : "sin descripcion", //Estos son valores por defecto para un nuevo lugar
      ubicacion : "sin especificar"
    })

    res.status(201).send(plan);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
