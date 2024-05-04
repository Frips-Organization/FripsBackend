const express = require("express");
const db = require("../../../models");
const {Lugar} = require("../../../models");

const router = express.Router();

//get lugar
router.get("/lugar", async (req, res, next) => {
    let nombre = req.query.nombre;
    await Lugar.findOne({
        where: {nombre: nombre}
    })
        .then((data) => {
            if (data) res.status(200).send(data);
            else res.status(404).send({error: "No encontrado"});
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