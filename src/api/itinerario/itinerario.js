const express = require("express");
const db = require("../../../models");
const { Itinerario } = require("../../../models");
const { Grupo } = require("../../../models");
const { where } = require("sequelize");

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

// Busca los itinerarios que pertenecen a un grupo, por el ID del grupo
router.get("/itinerario/:grupoId", async (req, res, next) => {
  const {grupoId} = req.params;

  try{

    const itinerarios = await Grupo.findOne({
      where: { grupoId },
      include: [
        {
          model: Itinerario,
        },
      ],
    });

    if(!itinerarios){
      return res.status(404).send("Itinerario no econtrado");
    }

    res.json({itinerarios})

  }catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }

});



module.exports = router;