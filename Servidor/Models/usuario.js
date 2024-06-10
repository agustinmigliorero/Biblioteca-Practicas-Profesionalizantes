const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const usuarioSchema = new Schema(
  {
    dni: { type: Number },
    nombre: { type: String },
    apellido: { type: String },
    email: { type: String },
    password: { type: String },
    rol: { type: String },
    activo: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Usuario", usuarioSchema);
