const RouterPrestamos = require("express").Router();
const {
  crearPrestamo,
  verPrestamo,
  verPrestamos,
  editarPrestamo,
  eliminarPrestamo,
} = require("../Controllers/prestamo");
const { catchAsync } = require("../middlewares");
const {
  validarPrestamo,
  validarEditarPrestamo,
} = require("../Validaciones/validaciones");

RouterPrestamos.route("/")
  .post(validarPrestamo, catchAsync(crearPrestamo))
  .get(catchAsync(verPrestamos));

RouterPrestamos.route("/:id")
  .get(catchAsync(verPrestamo))
  .put(validarEditarPrestamo, catchAsync(editarPrestamo))
  .delete(catchAsync(eliminarPrestamo));
module.exports = RouterPrestamos;
