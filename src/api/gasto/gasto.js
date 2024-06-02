const express = require("express");
const db = require("../../../models");
const {Gasto} = require("../../../models");
const { Usuario } = require("../../../models");
const { Plan } = require("../../../models");

const router = express.Router();

router.post("/gasto", async (req, res, next) => {
const { planId, userId,monto,motivo } = req.body;

    try{
        const newGasto = await Gasto.create({
            planId,
            userId,
            monto,
            motivo
        });
    // Devuelve el itinerario creado con un código de estado 201
    res.status(201).json(newGasto);
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
});



module.exports = router;