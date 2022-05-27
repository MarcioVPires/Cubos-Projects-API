const express = require("express");
const { login } = require("./controllers/login");
const { userSignup } = require("./controllers/user");

const rotas = express();

rotas.post("/signup", userSignup);
rotas.post("/login", login);

module.exports = rotas;
