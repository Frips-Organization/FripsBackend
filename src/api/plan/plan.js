const express = require("express");
const db = require("../../../models");
const {Plan} = require("../../../models");

const router = express.Router();

//post plan
router.post("/plan", async (req,res,next) => {
    let itinerario = req.body.itinerario // Esto es el id de itinerario
    let lugarID = req.body.lugarID
    let usuarioID = req.body.usuarioID
    let descripcion = req.body.descripcion
    let horaLlegada = req.body.horaLlegada
    let horaSalida = req.body.horaSalida
    let puntoPartida = req.body.puntoPartida
    let motivo = req.body.motivo
    let gastos = req.body.gastos
    //let createdAt pueden ser null y definirse despues
    //let updatedAt

    try{
        await Plan.create({
            itinerario: itinerario,
            lugarID: lugarID,
            usuarioID: usuarioID,
            descripcion: descripcion,
            horaLlegada: horaLlegada,
            horaSalida: horaSalida,
            puntoPartida: puntoPartida,
            motivo: motivo,
            gastos:gastos
        }).then((data) => {
            res.status(201).send("Created");
        }).catch((error) => {
            next(error);
        })
    }catch(error){
        console.log(error.message);
        res.status(500);
        res.send(error); 
    }
});

module.exports = router