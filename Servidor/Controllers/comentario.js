const Comentario = require("../Models/comentario");
const Libro = require("../Models/libro");
const Usuario = require("../Models/usuario");

//FUNCION PARA CREAR UN COMENTARIO
const crearComentario = async (req, res) => {
  const { idLibro, documento, textoComentario, puntuacion } = req.body;
  const comentario = new Comentario({
    idLibro,
    documento,
    textoComentario,
    puntuacion,
  });
  await comentario.save();
  await Libro.findByIdAndUpdate(idLibro, {
    $push: { comentarios: comentario._id },
  });
  await Usuario.findByIdAndUpdate(documento, {
    $push: { comentarios: comentario._id },
  });
  res.json({ mensaje: "Comentario creado", comentario });
};

//FUNCION PARA MODIFICAR UN COMENTARIO
const modificarComentario = async (req, res) => {
  const { id } = req.params;
  const { textoComentario, puntuacion } = req.body;
  const comentario = await Comentario.findByIdAndUpdate(id, {
    textoComentario,
    puntuacion,
  });
  res.json({ mensaje: "Comentario modificado", comentario });
};

//FUNCION PARA ELIMINAR UN COMENTARIO
const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  const comentario = await Comentario.findByIdAndDelete(id);
  await Libro.findByIdAndUpdate(comentario.idLibro, {
    $pull: { comentarios: id },
  });
  await Usuario.findByIdAndUpdate(comentario.documento, {
    $pull: { comentarios: id },
  });
  res.json({ mensaje: "Comentario eliminado", comentario });
};

//FUNCION PARA VER EL COMENTARIO DEL USUARIO
const verComentario = async (req, res) => {
  const { id } = req.params;
  const comentario = await Comentario.findById(id);
  res.json(comentario);
};

module.exports = {
  crearComentario,
  modificarComentario,
  eliminarComentario,
  verComentario,
};
