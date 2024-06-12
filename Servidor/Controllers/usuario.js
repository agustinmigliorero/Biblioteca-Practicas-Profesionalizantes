const Usuario = require("../Models/usuario");

const crearUsuario = async (req, res) => {
  // METODO PARA CREAR UN NUEVO USUARIO
  const { dni, nombre, apellido, email, password } = req.body; // SE OBTIENEN LOS DATOS DEL CUERPO DE LA PETICION
  const usuario = new Usuario({
    dni,
    nombre,
    apellido,
    email,
    password,
    username: dni,
  });

  const nuevoUsuario = await Usuario.register(usuario, password);

  const usuarioCreado = await Usuario.findOne({ username: dni });

  req.login(usuarioCreado, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ logeado: true, usuario: nuevoUsuario });
  });
};

// METODO PARA BUSCAR UN USUARIO POR ID
const buscarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  res.json(usuario);
};

// METODO PARA VER TODOS LOS USUARIOS
const verUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// METODO PARA EDITAR UN USUARIO
const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, password, rol, activo } = req.body;
  const usuario = await Usuario.findByIdAndUpdate(id, {
    nombre,
    apellido,
    email,
    password,
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

// METODO PARA INICIAR SESION
const loginUsuario = async (req, res) => {
  const { username } = req.body;
  const usuario = await Usuario.findOne({ username });
  res.json({ logeado: true, usuario: usuario });
};

// FALTA FUNCION PARA RECUPERAR LA CONTRASEÑA

// METODO PARA CERRAR SESION
const desconectarUsuario = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ logeado: false });
  });
};

// METODO PARA VERIFICAR SI EL USUARIO ESTA LOGEADO
const usuarioLogeado = async (req, res) => {
  if (req.user) {
    res.json({ logeado: true, usuario: req.user });
  } else {
    res.json({ logeado: false });
  }
};

// METODO DE ERROR EN EL LOGIN
const errorLogin = async (req, res) => {
  res.status(401).json({ error: true, msg: "Usuario o contraseña incorrecta" });
};

module.exports = {
  crearUsuario,
  buscarUsuario,
  verUsuarios,
  editarUsuario,
  eliminarUsuario,
  loginUsuario,
  desconectarUsuario,
  usuarioLogeado,
  errorLogin,
};
