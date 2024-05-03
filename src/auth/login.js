const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const secret = "MyBadKeptSecret";

router.post("/login", (req, res) => {
    let username = "";
    let password = "";


    username = req.body.user;
    password = req.body.password;

    const token = jwt.sign({ user: username, id: "1.23.4" }, secret, {
        expiresIn: "1 day",
        algorithm: "HS256",
        encoding: "UTF-8",
        issuer: "localhost:3001"
    });

    res.json(token);

})
module.exports = router;