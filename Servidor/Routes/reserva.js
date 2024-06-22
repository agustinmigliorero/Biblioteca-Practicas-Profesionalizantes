const RouterReservas = require("express").Router();
const {
  crearReserva,
  verReserva,
  verReservas,
  editarReserva,
  eliminarReserva,
} = require("../Controllers/reserva");
const { catchAsync } = require("../middlewares");
const {
  validarReserva,
  validarEditarReserva,
} = require("../Validaciones/validaciones");

RouterReservas.route("/")
  .post(validarReserva, catchAsync(crearReserva))
  .get(catchAsync(verReservas));

RouterReservas.route("/:id")
  .get(catchAsync(verReserva))
  .put(validarEditarReserva, catchAsync(editarReserva))
  .delete(catchAsync(eliminarReserva));
module.exports = RouterReservas;
