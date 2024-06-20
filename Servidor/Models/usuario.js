const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// MODELO DE LA CLASE USUARIO EN LA BASE DE DATOS
const usuarioSchema = new Schema(
  {
    dni: { type: Number },
    nombre: { type: String },
    apellido: { type: String },
    email: { type: String },
    rol: { default: "Estudiante", type: String },
    activo: { type: Boolean, default: false },
    comentarios: [{ type: Schema.Types.ObjectId, ref: "Comentario" }],
    //prestamos: [{ type: Schema.Types.ObjectId, ref: "Prestamo" }],
  },
  {
    timestamps: true,
  }
);

usuarioSchema.plugin(passportLocalMongoose); // PLUGIN DE PASSPORT PARA AUTENTICAR USUARIOS

module.exports = mongoose.model("Usuario", usuarioSchema);
