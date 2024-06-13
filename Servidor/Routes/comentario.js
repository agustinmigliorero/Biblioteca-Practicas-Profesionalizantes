const routerComentario = require("express").Router();
const {
  crearComentario,
  modificarComentario,
  eliminarComentario,
  verComentario,
} = require("../Controllers/comentario");

routerComentario.route("/").post(crearComentario);

routerComentario
  .route("/:id")
  .get(verComentario)
  .put(modificarComentario)
  .delete(eliminarComentario);

module.exports = routerComentario;
