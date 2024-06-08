require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const routerUsuarios = require("./Routes/usuario");

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

app.use(cors());

app.use(express.json());

//rutas
app.use("/usuarios", routerUsuarios);
//rutas

app.listen(process.env.PORT, () =>
  console.log(`Servidor encendido en el puerto: ${process.env.PORT}`)
);
