const express = require("express");
const cors = require("cors");
const authenticationMiddleware = require("./auth/authentication.middleware");
const app = express();

const auth = require("./auth");
const api = require("./api");
const { json, urlencoded } = require("body-parser");

// Configuración de CORS
app.use(cors());

app.use(json());
app.use(urlencoded());
app.use("/api", authenticationMiddleware);
app.use("/api", api);
app.use("/auth", auth);

module.exports = app;
