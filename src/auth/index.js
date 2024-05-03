const register = require("./register");
const login = require("./login");
const express = require("express");

const authIndex = express.Router();

authIndex.use(register);

authIndex.use(login);

module.exports = authIndex;