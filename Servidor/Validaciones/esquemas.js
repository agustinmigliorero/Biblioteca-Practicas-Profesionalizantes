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

const esquemaLibro = Joi.object({
  //idLibro: Joi.number(),
  titulo: Joi.string().required(),
  autor: Joi.string().required(),
  categoria: Joi.string().required(),
  copiaVirtual: Joi.string().required(),
  copiasLibro: Joi.number().required(),
  copiasDisponibles: Joi.number().required(),
  comentarios: Joi.array(),
});

const esquemaModificarLibro = Joi.object({
  //idLibro: Joi.number(),
  titulo: Joi.string(),
  autor: Joi.string(),
  categoria: Joi.string(),
  copiaVirtual: Joi.string(),
  copiasLibro: Joi.number().required(),
  copiasDisponibles: Joi.number().required(),
  comentarios: Joi.array(),
});

//ESQUEMA DE VALIDACION DE COMENTARIOS
const esquemaComentario = Joi.object({
  //idComentario: Joi.number(),
  idLibro: Joi.number().required(),
  documento: Joi.number().required(),
  textoComentario: Joi.string().required(),
  puntuacion: Joi.number().required(),
});

const esquemaModificarComentario = Joi.object({
  //idComentario: Joi.number(),
  idLibro: Joi.number().required(),
  documento: Joi.number().required(),
  textoComentario: Joi.string().required(),
  puntuacion: Joi.number().required(),
});

module.exports = {
  esquemaUsuario,
  esquemaEditarUsuario,
  esquemaLibro,
  esquemaModificarLibro,
  esquemaComentario,
  esquemaModificarComentario,
};
