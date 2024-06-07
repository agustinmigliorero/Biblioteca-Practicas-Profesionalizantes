const Usuario = require("../Models/usuario");

const crearUsuario = async (req, res) => {
  const { dni, nombre, email, rol, activo } = req.body;
  const usuario = new Usuario({ dni, nombre, email, rol, activo });
  await usuario.save();
  res.json({ mensaje: "Usuario creado", usuario });
};

const verUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  res.json(usuario);
};

const verUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { dni, nombre, email, rol, activo } = req.body;
  const usuario = await Usuario.findByIdAndUpdate(id, {
    dni,
    nombre,
    email,
    rol,
    activo,
  });
  res.json({ mensaje: "Usuario actualizado", usuario });
};

// CONTROLADOR PARA ELIMINAR USUARIO (SUJETO A EVALUACION DEL DISEÑADOR)
// const eliminarUsuario = async (req, res) => {
//   const { id } = req.params;
//   const usuario = await Usuario.findByIdAndDelete(id);
//   res.json({ mensaje: "Usuario eliminado", usuario });
// };

module.exports = { crearUsuario, verUsuario, verUsuarios, editarUsuario };
