const routerLibro = require("express").Router();
const {
  crearLibro,
  buscarLibro,
  verLibros,
  modificarLibro,
  eliminarLibro,
} = require("../Controllers/libro");

const { catchAsync } = require("../middlewares");

const {
  validarLibro,
  validarModificarLibro,
} = require("../Validaciones/validaciones");

routerLibro
  .route("/")
  .get(catchAsync(verLibros))
  .post(validarLibro, catchAsync(crearLibro));

routerLibro
  .route("/:id")
  .get(catchAsync(buscarLibro))
  .put(validarModificarLibro, catchAsync(modificarLibro))
  .delete(catchAsync(eliminarLibro));

module.exports = routerLibro;
