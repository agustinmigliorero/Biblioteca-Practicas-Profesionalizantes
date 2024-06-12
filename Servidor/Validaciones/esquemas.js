const Joi = require("joi");

//ESQUEMA DE VALIDACION DE USUARIOS
const esquemaUsuario = Joi.object({
  dni: Joi.number().required(),
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  email: Joi.string().email().required(),
  rol: Joi.string(),
  password: Joi.string().required(),
  activo: Joi.boolean(),
});

const esquemaEditarUsuario = Joi.object({
  dni: Joi.number(),
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  email: Joi.string().email().required(),
  rol: Joi.string(),
  password: Joi.string(),
  activo: Joi.boolean(),
});

module.exports = { esquemaUsuario, esquemaEditarUsuario };
