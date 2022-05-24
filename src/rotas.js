const express = require("express");
const { userSignup } = require("./controllers/user");
const rotas = express();

rotas.post("/user", userSignup);

module.exports = rotas;
