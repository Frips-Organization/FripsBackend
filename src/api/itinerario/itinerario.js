const express = require("express");
const db = require("../../../models");
const {Itinerario} = require("../../../models");

const router = express.Router();

//post itinerario
router.post("/itinerario", async (req,res,next) => {
    let grupoViajeId = req.body.grupoViajeId;
    let fecha = req.body.fecha;
    let userId = req.body.userId;
    //let gastoTotal = req.body.gastoTotal; //esta permitido el null
    //let kmTotal  = req.body.kmTotal;  //esta permitido el null
    try {
        await Itinerario.create({
            grupoViajeId: grupoViajeId,
            fecha: fecha,
            userId: userId 
        }).then((data) => {
            res.status(201).send("Created");
        }).catch((error) => {
            next(error);
        })
    }catch (error){
        console.log(error.message);
        res.status(500);
        res.send(error);
    }
});

module.exports = router;