import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrearComentario from "../../componentes/comentarios/CrearComentario";

function VerLibro({ usuarioLogeado }) {
  const [libro, setLibro] = useState({
    comentarios: [{ usuario: {}, editando: false }],
  });

  const [usuario, setUsuario] = useState({});
  const { id } = useParams();

  // const [comentario, setComentario] = useState("");
  // const [puntuacion, setPuntuacion] = useState(10);

  async function cargarLibro() {
    const respuesta = await fetch(`http://localhost:3000/libros/${id}`);
    const data = await respuesta.json();
    setLibro({
      ...data,
      comentarios: data.comentarios.map((comentario) => {
        return { ...comentario, editando: false };
      }),
    });
  }

  useEffect(() => {
    cargarLibro();
  }, []);

  async function fetchCrearComentario(comentario, puntuacion) {
    //console.log("Comentario: ", comentario, puntuacion);
    const response = await fetch("http://localhost:3000/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        idLibro: id,
        documento: usuarioLogeado.usuario._id,
        textoComentario: comentario,
        puntuacion: puntuacion,
      }),
    }).then((res) => {
      cargarLibro();
    });
  }

  return (
    <>
      <h1>Ver libro</h1>
      <p>Titulo: {libro.titulo}</p>
      <p>Autor: {libro.autor}</p>
      <p>Categoria: {libro.categoria}</p>
      <p>Copia Virtual: {libro.copiaVirtual}</p>
      <p>Copias Libro: {libro.copiasLibro}</p>

      <CrearComentario fetchCrearComentario={fetchCrearComentario} />
    </>
  );
}

export default VerLibro;
