require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const Usuario = require("./Models/usuario");
const routerUsuarios = require("./Routes/usuario");
const routerLibro = require("./Routes/libro");
const routerComentario = require("./Routes/comentario");
const routerReserva = require("./Routes/reserva");
const routerPrestamo = require("./Routes/prestamo");
const usuario = require("./Models/usuario");
const path = require("path");

//db conexion
mongoose.connect(process.env.MONGO_URL_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Base de datos conectada!"));
//db conexion

const app = express();

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});
//cors

app.use(express.json());

//passport y session
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Usuario.authenticate()));

passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());
//passport y session

//rutas
app.use("/api/usuarios", routerUsuarios);
app.use("/api/libros", routerLibro);
app.use("/api/comentarios", routerComentario);
app.use("/api/reservas", routerReserva);
app.use("/api/prestamos", routerPrestamo);

app.use(express.static(path.join(__dirname, "public")));
const htmlPath = path.join(__dirname, "public", "index.html");

app.get("*", (req, res) => {
  res.sendFile(htmlPath);
});
//rutas

//crear admin
async function crearAdmin() {
  const usuarios = await Usuario.find();

  if (usuarios.length === 0) {
    const admin = new Usuario({
      dni: 12345,
      nombre: "admin",
      apellido: "admin",
      email: "admin@admin.com",
      rol: "Administrativo",
      activo: true,
      username: 12345,
    });
    const nuevoUsuario = await Usuario.register(admin, "admin123");
  }
}

crearAdmin();
//crear admin

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});
//error handler

app.listen(process.env.PORT, () => {
  console.log(`Servidor encendido en el puerto: ${process.env.PORT}`);
  console.log("https://biblioteca-practicas-profesionalizantes.onrender.com/");
});
