const routerUsuarios = require("express").Router();
const {
  crearUsuario,
  verUsuario,
  verUsuarios,
  editarUsuario,
  eliminarUsuario,
} = require("../Controllers/usuario");

routerUsuarios.route("/").get(verUsuarios).post(crearUsuario);

routerUsuarios
  .route("/:id")
  .get(verUsuario)
  .put(editarUsuario)
  .delete(eliminarUsuario);

module.exports = routerUsuarios;
