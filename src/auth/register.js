const express = require("express");
const { json } = require("express");
const router = express.Router();
const db = require("../../models");
const { Usuario } = require("../../models");
router.post("/register", async (req, res, next) => {
  let nombre = req.body.nombre;
  let password = req.body.password;
  let email = req.body.email;

  try {
    await Usuario.create({
      nombre: nombre,
      password: password,
      email: email,
    })
      .then((data) => {
        res.status(201).json(data);
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

module.exports = router;
