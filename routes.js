const express = require("express");
const route = express.Router();

const homeControllers = require("./src/controllers/homeController");
const loginControllers = require("./src/controllers/loginController");
const contatoControllers = require("./src/controllers/contatoController.js");

const { loginRequired } = require("./src/middleware/middleware");

// Rotas da home
route.get("/", homeControllers.index);

//Rotas de Login
route.get("/login/index", loginControllers.index);
route.post("/login/register", loginControllers.register);
route.post("/login/login", loginControllers.login);
route.get("/login/logout", loginControllers.logout);

// Rotas de contato
route.get("/contato/index", loginRequired, contatoControllers.index);
route.post("/contato/register", loginRequired, contatoControllers.register);
route.get("/contato/index/:id", loginRequired, contatoControllers.editIndex);
route.post("/contato/edit/:id", loginRequired, contatoControllers.edit);
route.get("/contato/delete/:id", loginRequired, contatoControllers.delete);

module.exports = route;