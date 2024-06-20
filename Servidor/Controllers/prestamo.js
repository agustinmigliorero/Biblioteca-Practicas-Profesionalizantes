const Prestamo = require("../Models/prestamo");

const crearPrestamo = async (req, res) => {
  const { idPrestamo, documento, idLibro, fechaPrestamo, fechaDevolucion } =
    req.body;
  const prestamo = new Prestamo({
    idPrestamo,
    documento,
    idLibro,
    fechaPrestamo,
    fechaDevolucion,
  });
  await prestamo.save();
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
  res.json({ mensaje: "Prestamo eliminado", prestamo });
};

const editarPrestamo = async (req, res) => {
  const { id } = req.params;
  const { idLibro, documento, fechaPrestamo, fechaDevolucion } = req.body;
  const prestamo = await Prestamo.findByIdAndUpdate(id, {
    idLibro,
    documento,
    fechaPrestamo,
    fechaDevolucion,
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
