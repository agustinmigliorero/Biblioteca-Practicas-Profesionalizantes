const Joi = require("joi");

const esquemaUsuario = Joi.object({
  dni: Joi.number().required(),
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  email: Joi.string().email().required(),
  rol: Joi.string(),
  password: Joi.string().required(),
  activo: Joi.boolean(),
});

module.exports = { esquemaUsuario };
