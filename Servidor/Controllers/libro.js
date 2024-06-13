const Libro = require("../Models/libro");

//FUNCION PARA CREAR UN NUEVO LIBRO
const crearLibro = async (req, res) => {
  const {
    //idLibro,
    titulo,
    autor,
    categoria,
    copiaVirtual,
    copiasLibro,
    copiasDisponibles,
  } = req.body;
  const libro = new Libro({
    //idLibro,
    titulo,
    autor,
    categoria,
    copiaVirtual,
    copiasLibro,
    copiasDisponibles,
  });
  await libro.save();
  res.json({ mensaje: "Libro creado" });
};

//FUNCION PARA ELEMINAR UN NUEVO LIBRO
const eliminarLibro = async (req, res) => {
  const { id } = req.params;
  const libro = await Libro.findByIdAndDelete(id);
  res.json({ mensaje: "Libro eliminado", libro });
};

//FUNCION PARA MODIFICAR UN LIBRO (CONSULTAR AL DISEÑADOR SOBRE CAMBIOS A LA FUNCION)
const modificarLibro = async (req, res) => {
  const { id } = req.params;
  const { copiasLibro, copiasDisponibles } = req.body;
  const libro = await Libro.findByIdAndUpdate(id, {
    copiasLibro,
    copiasDisponibles,
  });
  res.json({ mensaje: "Libro modificado", libro });
};
//FUNCION PARA BUSCAR LIBROS
const buscarLibro = async (req, res) => {
  const { id } = req.params;
  const libro = await Libro.findById(id);
  res.json(libro);
};

//FUNCION PARA VER TODOS LOS LIBROS
const verLibros = async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
};

//FUNCION PARA GENERAR INFORMES DE CADA LIBRO (RESERVAS, PUNTUACION, COMENTARIOS)

module.exports = {
  crearLibro,
  buscarLibro,
  verLibros,
  modificarLibro,
  eliminarLibro,
};
