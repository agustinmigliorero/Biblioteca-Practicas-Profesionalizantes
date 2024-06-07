const express = require("express");
const mongoose = require("mongoose");
//const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const routerUsuarios = require("./Routes/usuario");

//db conexion
mongoose.connect("mongodb://127.0.0.1:27017/biblioteca", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Base de datos conectada!"));

//db conexion

const app = express();

app.use(express.json());

//rutas
app.use("/usuarios", routerUsuarios);
//rutas

app.listen(3000, () => console.log("Server listening on port 3000"));
