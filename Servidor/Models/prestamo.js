const moongose = require("mongoose");
const Schema = moongose.Schema;

const schemaPrestamo = new Schema({
  idPrestamo: { type: Number },
  idLibro: { type: Schema.Types.ObjectId, ref: "Libro" },
  documento: { type: Schema.Types.ObjectId, ref: "Usuario" },
  //fechaDeInicio { type: Date }, fecha acordada de inicio de prestamo
  //fechaDeFin { type: Date }, fecha acordada de fin de prestamo
  //fechaDevolucion { type: Date }, fecha real de devolución
  fechaPrestamo: { type: Date },
  fechaDevolucion: { type: Date },
  fechaRealDevolucion: { type: Date },
});

module.exports = moongose.model("Prestamo", schemaPrestamo);
