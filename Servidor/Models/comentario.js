const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaComentario = new Schema({
  idComentario: { type: Number },
  idLibro: { type: Schema.Types.ObjectId, ref: "Libro" },
  documento: { type: Schema.Types.ObjectId, ref: "Usuario" }, //id del autor del comentario
  textoComentario: { type: String },
  puntuacion: { type: Number },
});

module.exports = mongoose.model("Comentario", schemaComentario);
