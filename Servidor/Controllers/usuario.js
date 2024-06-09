const Usuario = require("../Models/usuario");

const crearUsuario = async (req, res) => {
  const { dni, nombre, email, rol, activo, password } = req.body;
  const usuario = new Usuario({
    dni,
    nombre,
    email,
    rol,
    activo,
    password,
    username: dni,
  });

  const nuevoUsuario = await Usuario.register(usuario, password);

  req.login(nuevoUsuario, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ logeado: true, usuario: nuevoUsuario });
  });
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
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndDelete(id);
  res.json({ mensaje: "Usuario eliminado", usuario });
};

const loginUsuario = async (req, res) => {
  const { username } = req.body;
  const usuario = await Usuario.findOne({ username });
  res.json({ logeado: true, usuario: usuario });
};

const desconectarUsuario = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ logeado: false });
  });
};

const usuarioLogeado = async (req, res) => {
  if (req.user) {
    res.json({ logeado: true, usuario: req.user });
  } else {
    res.json({ logeado: false });
  }
};

const errorLogin = async (req, res) => {
  res.status(401).json({ error: true, msg: "Usuario o contraseña incorrecta" });
};

module.exports = {
  crearUsuario,
  verUsuario,
  verUsuarios,
  editarUsuario,
  eliminarUsuario,
  loginUsuario,
  desconectarUsuario,
  usuarioLogeado,
  errorLogin,
};
