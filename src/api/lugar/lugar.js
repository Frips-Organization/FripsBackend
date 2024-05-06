const express = require("express");
const db = require("../../../models");
const { Lugar } = require("../../../models");

const router = express.Router();

//get lugar
router.get("/lugar", async (req, res, next) => {
  let { nombre } = req.query;
  await Lugar.findOne({
    where: { nombre: nombre },
  })
    .then((data) => {
      if (data) res.status(200).send(data);
      else res.status(404).send({ error: "No encontrado" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message ?? "Error Desconocido");
    });
});
router.post("/lugar", async (req, res, next) => {
  res.send("ok");
});
//router.put();
//router.delete();

module.exports = router;


router.post("/lugar", async (req, res, next) => {
  let { grupoId, userId } = req.body;
  try {
    await GrupoViaje.create({
      nombre : nombre, //nombre del lugar
      descripcion : "sin descripcion", //Estos son valores por defecto para un nuevo lugar
      ubicacion : "sin especificar"
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