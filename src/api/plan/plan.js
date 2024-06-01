const express = require("express");
const db = require("../../../models");
const { Plan } = require("../../../models");
const {Lugar} = require("../../../models");
const { Itinerario } = require("../../../models");
const router = express.Router();

//post plan
router.post("/plan", async (req, res, next) => {
  const {
    nombrelugar,
    itinerarioId,
    userId,
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
      itinerarioId : itinerarioId,
      userId : userId,
      nombrelugar: nombrelugar,
      descripcion : descripcion,
      horaLlegada : horaLlegada,
      horaSalida : horaSalida,
      puntoPartida: puntoPartida,
      motivo: motivo
     });

    //Aqui hace falta verificar que si el nombre del lugar ya
    //existe en la tabla "Lugar", entonces se salte la siguiente insercion

    const lugar = await Lugar.create({
      nombre : nombrelugar,
      descripcion : "sin descripcion", //Estos son valores por defecto para un nuevo lugar
      ubicacion : "sin especificar"
    })

    res.status(201).send("Created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/plan/:itinerarioId", async(req,res,next) => {
const {itinerarioId} = req.params;

try {

  const planes = await Itinerario.finOne({
    where : { itinerarioId },
    include: [
      {
        model: Plan,
      },
    ],
  });

  if(!planes) {
    return res.status(404).send("Plane no econtrado");
  }

  res.json({ planes });
  
}catch (error) {
  console.error(error);
  res.status(500).send("Error interno del servidor");
}

});

module.exports = router;
