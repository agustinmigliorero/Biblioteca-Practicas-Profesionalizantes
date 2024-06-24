const {
  esquemaUsuario,
  esquemaEditarUsuario,
  esquemaLibro,
  esquemaModificarLibro,
  esquemaComentario,
  esquemaModificarComentario,
  esquemaReserva,
  esquemaEditarReserva,
  esquemaPrestamo,
  esquemaEditarPrestamo,
} = require("./esquemas");

//VALIDACION DE USUARIOS
const validarUsuario = (req, res, next) => {
  const { error } = esquemaUsuario.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarEditarUsuario = (req, res, next) => {
  const { error } = esquemaEditarUsuario.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//VALIDACION DE LIBROS
const validarLibro = (req, res, next) => {
  const { error } = esquemaLibro.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarModificarLibro = (req, res, next) => {
  const { error } = esquemaModificarLibro.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//VALIDACION DE COMENTARIOS
const validarComentario = (req, res, next) => {
  const { error } = esquemaComentario.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarModificarComentario = (req, res, next) => {
  const { error } = esquemaModificarComentario.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//VALIDACION DE PRESTAMOS

const validarPrestamo = (req, res, next) => {
  const { error } = esquemaPrestamo.validate(req.body);
  let { fechaDeInicio, fechaDeFin } = req.body;
  let dateFechaInicio = new Date(fechaDeInicio);
  let dateFechaFin = new Date(fechaDeFin);
  if (dateFechaInicio.getTime() > dateFechaFin.getTime()) {
    return res
      .status(400)
      .json({ error: "La fecha de fin debe ser mayor a la fecha de inicio" });
  }
  if (
    dateFechaFin.getTime() < Date.now() ||
    dateFechaInicio.getTime() < Date.now()
  ) {
    return res.status(400).json({
      error:
        "La fecha de fin o la fecha de inicio no pueden ser menores a la fecha actual",
    });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarEditarPrestamo = (req, res, next) => {
  const { error } = esquemaEditarPrestamo.validate(req.body);
  let { fechaDeInicio, fechaDeFin } = req.body;
  let dateFechaDeInicio = new Date(fechaDeInicio);
  let dateFechaDeFin = new Date(fechaDeFin);
  if (dateFechaDeInicio.getTime() > dateFechaDeFin.getTime()) {
    return res
      .status(400)
      .json({ error: "La fecha de fin debe ser mayor a la fecha de inicio" });
  }
  if (dateFechaDeFin.getTime() < Date.now()) {
    return res
      .status(400)
      .json({ error: "La fecha de fin no puede ser menor a la fecha actual" });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//VALIDACION DE RESERVAS
const validarReserva = (req, res, next) => {
  const { error } = esquemaReserva.validate(req.body);
  let { fechaReserva, fechaDevolucion } = req.body;
  let dateFechaReserva = new Date(fechaReserva);
  let dateFechaDevolucion = new Date(fechaDevolucion);
  if (dateFechaReserva.getTime() > dateFechaDevolucion.getTime()) {
    return res.status(400).json({
      error: "La fecha de devolución debe ser mayor a la fecha de reserva",
    });
  }
  if (
    dateFechaReserva.getTime() < Date.now() ||
    dateFechaDevolucion.getTime() < Date.now()
  ) {
    return res.status(400).json({
      error:
        "La fecha de reserva y la fecha de devolución no pueden ser menores a la fecha actual",
    });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarEditarReserva = (req, res, next) => {
  const { error } = esquemaEditarReserva.validate(req.body);
  let { fechaReserva, fechaDevolucion } = req.body;
  if (fechaReserva > fechaDevolucion) {
    return res.status(400).json({
      error: "La fecha de devolución debe ser mayor a la fecha de reserva",
    });
  }
  if (fechaReserva < Date.now() || fechaDevolucion < Date.now()) {
    return res.status(400).json({
      error:
        "La fecha de reserva y la fecha de devolución no pueden ser menores a la fecha actual",
    });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validarUsuario,
  validarEditarUsuario,
  validarLibro,
  validarModificarLibro,
  validarComentario,
  validarModificarComentario,
  validarReserva,
  validarEditarReserva,
  validarPrestamo,
  validarEditarPrestamo,
};
