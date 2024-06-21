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
const {
  validarUsuario,
  validarEditarUsuario,
} = require("../Validaciones/validaciones");
const passport = require("passport");

routerUsuarios
  .route("/")
  .get(catchAsync(verUsuarios))
  .post(validarUsuario, catchAsync(crearUsuario));

// METODO Y RUTA PARA INICIAR SESION
routerUsuarios.post(
  "/iniciar-sesion",
  passport.authenticate("local", {
    failureRedirect: "/api/usuarios/error-iniciar-sesion",
  }),
  catchAsync(loginUsuario)
);

routerUsuarios.get("/desconectarse", catchAsync(desconectarUsuario));
routerUsuarios.get("/usuario-logeado", catchAsync(usuarioLogeado));
routerUsuarios.post("/error-login", catchAsync(errorLogin));

routerUsuarios
  .route("/:id")
  .get(catchAsync(buscarUsuario))
  .put(validarEditarUsuario, catchAsync(editarUsuario))
  .delete(catchAsync(eliminarUsuario));

module.exports = routerUsuarios;
