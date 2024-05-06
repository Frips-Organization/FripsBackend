const express = require("express");
const db = require("../../../models");
const { Itinerario } = require("../../../models");

const router = express.Router();

// Ruta POST para crear un itinerario
router.post("/itinerario", async (req, res) => {
  const { nombre, grupoId, fecha, userId } = req.body;

  try {
    // Crea un nuevo itinerario con los datos proporcionados
    const newItinerary = await Itinerario.create({
      nombre,
      grupoId,
      fecha,
      userId,
    });

    // Devuelve el itinerario creado con un código de estado 201
    res.status(201).json(newItinerary);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
