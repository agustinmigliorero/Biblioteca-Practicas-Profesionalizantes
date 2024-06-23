const Prestamo = require("../Models/prestamo");
const Libro = require("../Models/libro");
const Usuario = require("../Models/usuario");

const crearPrestamo = async (req, res) => {
  const { documento, idLibro, fechaDeInicio, fechaDeFin } = req.body;
  const prestamo = new Prestamo({
    documento,
    idLibro,
    fechaDeInicio,
    fechaDeFin,
  });
  await prestamo.save();
  await Libro.findByIdAndUpdate(idLibro, {
    $push: { prestamos: prestamo._id },
  });
  await Usuario.findByIdAndUpdate(documento, {
    $push: { prestamos: prestamo._id },
  });
  res.json({ mensaje: "Prestamo creado" });
};

const verPrestamo = async (req, res) => {
  const { id } = req.params;
  const prestamo = await Prestamo.findById(id);
  res.json(prestamo);
};

const verPrestamos = async (req, res) => {
  const prestamos = await Prestamo.find();
  res.json(prestamos);
};

const eliminarPrestamo = async (req, res) => {
  const { id } = req.params;
  const prestamo = await Prestamo.findByIdAndDelete(id);
  await Libro.findByIdAndUpdate(prestamo.idLibro, {
    $pull: { prestamos: id },
  });
  await Usuario.findByIdAndUpdate(prestamo.documento, {
    $pull: { prestamos: id },
  });
  res.json({ mensaje: "Prestamo eliminado", prestamo });
};

const editarPrestamo = async (req, res) => {
  const { id } = req.params;
  const { idLibro, documento, fechaDeInicio, fechaDeFin } = req.body;
  const prestamo = await Prestamo.findByIdAndUpdate(id, {
    idLibro,
    documento,
    fechaDeInicio,
    fechaDeFin,
  });
  res.json({ mensaje: "Prestamo modificado", prestamo });
};

//FUNCION PARA RENOVAR PRESTAMOS

//FUNCION HISTORIAL DE PRESTAMOS

module.exports = {
  crearPrestamo,
  verPrestamo,
  verPrestamos,
  editarPrestamo,
  eliminarPrestamo,
};
