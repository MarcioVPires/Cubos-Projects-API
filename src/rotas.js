const express = require("express");
const { login } = require("./controllers/login");
const { userSignup } = require("./controllers/user");
const { authFilter } = require("./middleware/authentication");

const rotas = express();

rotas.post("/signup", userSignup);
rotas.post("/login", login);

rotas.use(authFilter);

module.exports = rotas;
