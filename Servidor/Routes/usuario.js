const routerUsuarios = require("express").Router();
const {
  crearUsuario,
  verUsuario,
  verUsuarios,
  editarUsuario,
} = require("../Controllers/usuario");

routerUsuarios.route("/").get(verUsuarios).post(crearUsuario);

routerUsuarios.route("/:id").get(verUsuario).put(editarUsuario);

module.exports = routerUsuarios;
