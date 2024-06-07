const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
  {
    dni: { type: Number },
    nombre: { type: String },
    email: { type: String },
    rol: { type: String },
    activo: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
