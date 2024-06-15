const {
  esquemaUsuario,
  esquemaEditarUsuario,
  esquemaLibro,
  esquemaModificarLibro,
  esquemaComentario,
  esquemaModificarComentario,
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

module.exports = {
  validarUsuario,
  validarEditarUsuario,
  validarLibro,
  validarModificarLibro,
  validarComentario,
  validarModificarComentario,
};
