const moongose = require("mongoose");
const Schema = moongose.Schema;

const schemaReserva = new Schema({
  documento: { type: Schema.Types.ObjectId, ref: "Usuario" },
  idLibro: { type: Schema.Types.ObjectId, ref: "Libro" },
  fechaReserva: { type: Date },
  fechaDevolucion: { type: Date },
  estadoReserva: { type: Boolean, default: true },
});

module.exports = moongose.model("Reserva", schemaReserva);
