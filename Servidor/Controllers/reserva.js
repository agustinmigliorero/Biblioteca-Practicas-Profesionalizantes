const Reserva = require("../Models/reserva");
const Libro = require("../Models/libro");
const Usuario = require("../Models/usuario");

const crearReserva = async (req, res) => {
  const { idLibro, documento, fechaReserva, fechaDevolucion, estadoReserva } =
    req.body;

  const reserva = new Reserva({
    idLibro,
    documento,
    fechaReserva,
    fechaDevolucion,
    estadoReserva,
  });
  await reserva.save();
  await Libro.findByIdAndUpdate(idLibro, {
    $push: { reservas: reserva._id },
  });
  await Usuario.findByIdAndUpdate(documento, {
    $push: { reservas: reserva._id },
  });
  res.json({ mensaje: "Reserva creada" });
};

const verReserva = async (req, res) => {
  const { id } = req.params;
  const reserva = await Reserva.findById(id);
  res.json(reserva);
};

const verReservas = async (req, res) => {
  const reservas = await Reserva.find();
  res.json(reservas);
};

const editarReserva = async (req, res) => {
  const { id } = req.params;
  const { idLibro, documento, fechaReserva, fechaDevolucion, estadoReserva } =
    req.body;
  const reserva = await Reserva.findByIdAndUpdate(id, {
    idLibro,
    documento,
    fechaReserva,
    fechaDevolucion,
    estadoReserva,
  });
  res.json({ mensaje: "Reserva modificada", reserva });
};

//FUNCION PARA ELIMINAR RESERVA
const eliminarReserva = async (req, res) => {
  const { id } = req.params;
  const reserva = await Reserva.findByIdAndDelete(id);
  await Libro.findByIdAndUpdate(reserva.idLibro, {
    $pull: { reservas: id },
  });
  await Usuario.findByIdAndUpdate(reserva.documento, {
    $pull: { reservas: id },
  });
  res.json({ mensaje: "Reserva eliminada", reserva });
};

//FUNCION DE AVISOS DE RESERVA

module.exports = {
  crearReserva,
  verReserva,
  verReservas,
  editarReserva,
  eliminarReserva,
};
