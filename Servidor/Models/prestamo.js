const moongose = require("mongoose");
const Schema = moongose.Schema;

const schemaPrestamo = new Schema({
  idLibro: { type: Schema.Types.ObjectId, ref: "Libro" },
  documento: { type: Schema.Types.ObjectId, ref: "Usuario" },
  fechaDeInicio: { type: Date },
  fechaDeFin: { type: Date },
  fechaDevolucion: { type: Date },
});

module.exports = moongose.model("Prestamo", schemaPrestamo);
