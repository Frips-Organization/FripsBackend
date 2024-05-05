const express = require("express");
const db = require("../../../models");
const {Grupo} = require("../../../models");

const router = express.Router();

//router.get() hay que hacer un get por ID

router.post("/grupo", async (req,res,next) => {
    let nombre = req.body.nombre;
    let estado = req.body.estado;
    
    try{
        await Grupo.create({
            nombre: nombre,
            estado: estado 
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

module.exports = router;