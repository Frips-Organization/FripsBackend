const express = require("express");
const db = require("../../../models");
const { Grupo } = require("../../../models");
const { GrupoViaje } = require("../../../models");
const router = express.Router();

//router.get() hay que hacer un get por ID

router.post("/grupo", async (req, res, next) => {
  const { nombre, userId } = req.body;

  try {
    const grupo = await Grupo.create({
      nombre: nombre,
      estado: true,
    });

    const grupoId = grupo.grupoId; // Accede al ID del grupo creado

    await GrupoViaje.create({
      grupoId,
      userId,
    });

    res.status(201).send("Created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
