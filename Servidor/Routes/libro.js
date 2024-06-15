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
  .get(verLibros)
  .post(validarLibro, catchAsync(crearLibro));

routerLibro
  .route("/:id")
  .get(buscarLibro)
  .put(validarModificarLibro, catchAsync(modificarLibro))
  .delete(eliminarLibro);

module.exports = routerLibro;
