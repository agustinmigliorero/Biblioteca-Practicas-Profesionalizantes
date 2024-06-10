const { esquemaUsuario, esquemaEditarUsuario } = require("./esquemas");

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

module.exports = { validarUsuario, validarEditarUsuario };
