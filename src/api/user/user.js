const express = require("express");
const db = require("../../../models");
const {Usuario} = require("../../../models");
const { where } = require("sequelize");
const router = express.Router();

// router.get("/user", async (req, res,next) => {
//     let userId = req.body.userId;
//     await Usuario.findOne({userId: userId})
//         .then((user)=> res.status(200).send(user.toJSON()))
//         .catch((error)=> res.status(400).send({error: "Usuario no encontrado"})).then(next);

// })


router.get("/user/:userId", async (req, res, next) => {
    const  {userId} = req.params;
    try{
        const usuario = await Usuario.findOne({
            where: { userId }
        })
        res.json({usuario});
    }catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});


module.exports = router;