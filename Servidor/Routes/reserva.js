const RouterReservas = require("express").Router();
const {
  crearReserva,
  verReserva,
  verReservas,
  editarReserva,
  eliminarReserva,
} = require("../Controllers/reserva");
const { catchAsync } = require("../middlewares");

RouterReservas.route("/")
  .post(catchAsync(crearReserva))
  .get(catchAsync(verReservas));

RouterReservas.route("/:id")
  .get(catchAsync(verReserva))
  .put(catchAsync(editarReserva))
  .delete(catchAsync(eliminarReserva));
module.exports = RouterReservas;
