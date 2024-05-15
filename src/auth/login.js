const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const { Usuario } = require("../../models");

const router = express.Router();

const secret = "MyBadKeptSecret";

router.post("/login", async (req, res, next) => {
  let email = "";
  let password = "";

  email = req.body.email;
  password = req.body.password;

  const user = await Usuario.findOne({ where: { email: email.toString() } });
  if (!user) {
    res.status(401).send({ error: "Email no encontrado" });
    next();
  } else {
    if (user.password === password) {
      const token = jwt.sign({ user: user.userId, email: user.email }, secret, {
        expiresIn: "1440 minutes", //1 dia
        algorithm: "HS256",
        encoding: "UTF-8",
        issuer: "localhost:3001",
      });
      res.status(200).send({
        userId: user.userId,
        nombre: user.nombre,
        email: user.email,
        accessToken: token,
      });
    } else {
      res.status(401).send({ error: "Contrasena incorrecta" });
    }
  }
});
module.exports = router;
