const express = require("express");
const db = require("../../../models");
const {Usuario} = require("../../../models");
const router = express.Router();
router.get("/user", async (req, res,next) => {
    let userId = req.body.userId;
    await Usuario.findOne({userId: userId})
        .then((user)=> res.status(200).send(user.toJSON()))
        .catch((error)=> res.status(400).send({error: "Usuario no encontrado"})).then(next);

})

module.exports = router;