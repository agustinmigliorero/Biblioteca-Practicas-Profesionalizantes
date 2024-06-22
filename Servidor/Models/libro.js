const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaLibro = new Schema({
  titulo: { type: String },
  autor: { type: String },
  categoria: { type: String },
  copiaVirtual: { type: String }, // url de la copia virtual
  copiasLibro: { type: Number },
  //copiasDisponibles: { type: Number },
  comentarios: [{ type: Schema.Types.ObjectId, ref: "Comentario" }], // array de comentarios
  descripcion: { type: String },
  imagen: { type: String },
  reservas: [{ type: Schema.Types.ObjectId, ref: "Reserva" }],
});

module.exports = mongoose.model("Libro", schemaLibro);
