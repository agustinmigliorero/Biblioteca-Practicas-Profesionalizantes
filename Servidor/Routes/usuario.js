const routerUsuarios = require("express").Router();
const {
  crearUsuario,
  buscarUsuario,
  verUsuarios,
  editarUsuario,
  eliminarUsuario,
  loginUsuario,
  desconectarUsuario,
  usuarioLogeado,
  errorLogin,
} = require("../Controllers/usuario");
const { catchAsync } = require("../middlewares");
const { validarUsuario } = require("../Validaciones/validaciones");
const passport = require("passport");

routerUsuarios.route("/").get(verUsuarios).post(validarUsuario, crearUsuario);

routerUsuarios.post(
  "/iniciar-sesion",
  passport.authenticate("local", {
    failureRedirect: "/usuarios/error-iniciar-sesion",
  }),
  catchAsync(loginUsuario)
);

routerUsuarios.get("/desconectarse", catchAsync(desconectarUsuario));
routerUsuarios.get("/usuario-logeado", catchAsync(usuarioLogeado));
routerUsuarios.post("/error-login", catchAsync(errorLogin));

routerUsuarios
  .route("/:id")
  .get(buscarUsuario)
  .put(editarUsuario)
  .delete(eliminarUsuario);

module.exports = routerUsuarios;
