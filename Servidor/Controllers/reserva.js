const Reserva = require("../Models/reserva");

const crearReserva = async (req, res) => {
  const {
    //idReserva,
    idLibro,
    documento,
    fechaReserva,
    fechaDevolucion,
    estadoReserva,
  } = req.body;

  const reserva = new Reserva({
    //idReserva,
    idLibro,
    documento,
    fechaReserva,
    fechaDevolucion,
    estadoReserva,
  });
  await reserva.save();
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
  const { idLibro, documento, fechaReserva, fechaDevolucion } = req.body;
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
