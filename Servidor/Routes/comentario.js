const routerComentario = require("express").Router();
const {
  crearComentario,
  modificarComentario,
  eliminarComentario,
  verComentario,
} = require("../Controllers/comentario");

const { catchAsync } = require("../middlewares");

const {
  validarComentario,
  validarModificarComentario,
} = require("../Validaciones/validaciones");

routerComentario
  .route("/")
  .post(validarComentario, catchAsync(crearComentario));

routerComentario
  .route("/:id")
  .get(catchAsync(verComentario))
  .put(validarModificarComentario, catchAsync(modificarComentario))
  .delete(catchAsync(eliminarComentario));

module.exports = routerComentario;
