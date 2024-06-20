const RouterPrestamos = require("express").Router();
const {
  crearPrestamo,
  verPrestamo,
  verPrestamos,
  editarPrestamo,
  eliminarPrestamo,
} = require("../Controllers/prestamo");
const { catchAsync } = require("../middlewares");

RouterPrestamos.route("/")
  .post(catchAsync(crearPrestamo))
  .get(catchAsync(verPrestamos));

RouterPrestamos.route("/:id")
  .get(catchAsync(verPrestamo))
  .put(catchAsync(editarPrestamo))
  .delete(catchAsync(eliminarPrestamo));
module.exports = RouterPrestamos;
