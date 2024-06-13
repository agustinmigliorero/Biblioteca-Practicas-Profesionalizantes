const routerLibro = require("express").Router();
const {
  crearLibro,
  buscarLibro,
  verLibros,
  modificarLibro,
  eliminarLibro,
} = require("../Controllers/libro");

routerLibro.route("/").get(verLibros).post(crearLibro);

routerLibro
  .route("/:id")
  .get(buscarLibro)
  .put(modificarLibro)
  .delete(eliminarLibro);

module.exports = routerLibro;
