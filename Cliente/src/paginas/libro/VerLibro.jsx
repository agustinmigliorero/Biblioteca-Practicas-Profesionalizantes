import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CrearComentario from "../../componentes/comentarios/CrearComentario";
import Alerta from "../../componentes/Alerta";

function VerLibro({ usuarioLogeado }) {
  const [libro, setLibro] = useState({
    comentarios: [{ documento: {}, editando: false }],
  });

  const { id } = useParams();

  const [alerta, setAlerta] = useState({ mensaje: "", error: false });

  const [textoComentario, setTextoComentario] = useState("");
  const [puntuacionComentario, setPuntuacionComentario] = useState(5);

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

  async function fetchCrearComentario(comentario, puntuacion, comento) {
    if (comento) {
      return;
    }
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
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setAlerta({
            error: true,
            mensaje: "Error al crear el comentario, revise los campos",
          });
        } else {
          cargarLibro();
          setAlerta({
            error: false,
            mensaje: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchBorrarLibro() {
    let borrar = confirm("Estas seguro de borrar el Libro?");
    if (borrar) {
      fetch(`http://localhost:3000/libros/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          navigate("/libros");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function calcularPromedioPuntaje() {
    let suma = 0;
    let promedio = 0;
    for (let i = 0; i < libro.comentarios.length; i++) {
      suma += libro.comentarios[i].puntuacion;
    }
    promedio = suma / libro.comentarios.length;
    return isNaN(promedio / libro.comentarios.length)
      ? "No hay puntuaciones"
      : (promedio / libro.comentarios.length).toFixed(2);
  }

  function mostrarFormEditarComentario(idComentario, mostrar = true) {
    setLibro({
      ...libro,
      comentarios: libro.comentarios.map((comentario) => {
        if (comentario._id === idComentario && mostrar) {
          setTextoComentario(comentario.textoComentario);
          setPuntuacionComentario(comentario.puntuacion);
          return { ...comentario, editando: true };
        } else {
          return { ...comentario, editando: false };
        }
      }),
    });
  }

  function handleChangeTextoComentario(evento) {
    setTextoComentario(evento.target.value);
  }

  function handleChangePuntuacionComentario(evento) {
    setPuntuacionComentario(evento.target.value);
  }

  function formEditarComentario(idComentario) {
    return (
      <>
        <textarea
          type="text"
          onChange={handleChangeTextoComentario}
          value={textoComentario}
          placeholder="Comentario"
          name="textoComentario"
          cols="80"
          rows="6"
        ></textarea>
        <br />
        <input
          name="puntuacion"
          type="number"
          min={1}
          max={5}
          onChange={handleChangePuntuacionComentario}
          value={puntuacionComentario}
        />
        <br />
        <button onClick={() => fetchEditarComentario(idComentario)}>
          Guardar
        </button>
        <button
          onClick={() => mostrarFormEditarComentario(idComentario, false)}
        >
          Cancelar
        </button>
      </>
    );
  }

  function fetchEditarComentario(idComentario) {
    fetch(`http://localhost:3000/comentarios/${idComentario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        textoComentario: textoComentario,
        puntuacion: puntuacionComentario,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setAlerta({
            error: true,
            mensaje: "Error al editar el comentario, revise los campos",
          });
        } else {
          mostrarFormEditarComentario(idComentario, false);
          cargarLibro();
          setAlerta({
            error: false,
            mensaje: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchBorrarComentario(idComentario) {
    let borrar = confirm("Estas seguro de borrar el comentario?");
    if (borrar) {
      fetch(`http://localhost:3000/comentarios/${idComentario}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          cargarLibro();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function botonesBorrarYEditarLibro() {
    if (usuarioLogeado.usuario) {
      if (
        (usuarioLogeado.logeado &&
          usuarioLogeado.usuario.rol === "Administrativo") ||
        usuarioLogeado.usuario.rol === "Bibliotecario"
      ) {
        return (
          <>
            <Link to={`/libros/editar-libro/${libro._id}`}>
              <button className="btn btn-warning">Editar</button>
            </Link>
            <button className="btn btn-danger" onClick={fetchBorrarLibro}>
              Borrar
            </button>
          </>
        );
      }
    }
  }

  function verComentarios() {
    return libro.comentarios.map((comentario) => {
      console.log(comentario);
      return (
        <div
          className="w-50 mt-4"
          style={{ border: "1px solid black" }}
          key={comentario._id}
        >
          <p>
            Usuario: {comentario.documento.nombre}{" "}
            {comentario.documento.apellido}
          </p>
          <p>Comentario: {comentario.textoComentario}</p>
          <p>Puntuacion: {comentario.puntuacion}</p>
        </div>
      );
    });
  }

  function botonesBorrarYEditarComentario(idAutorComentario, idComentario) {
    if (usuarioLogeado.usuario) {
      if (
        idAutorComentario === usuarioLogeado.usuario._id ||
        usuarioLogeado.usuario.rol === "Administrativo"
      ) {
        return (
          <>
            <button
              className="btn btn-warning"
              onClick={() => mostrarFormEditarComentario(idComentario)}
            >
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => fetchBorrarComentario(idComentario)}
            >
              Borrar
            </button>
          </>
        );
      }
    }
  }

  function calcularPromedioPuntaje() {
    let promedio = 0;
    for (let i = 0; i < libro.comentarios.length; i++) {
      promedio += libro.comentarios[i].puntuacion;
    }
    return isNaN(promedio / libro.comentarios.length)
      ? "No hay puntuaciones"
      : (promedio / libro.comentarios.length).toFixed(2);
  }

  function verificarComentarioUsuario(comentario, puntuacion) {
    let usuarioComento = false;
    for (let i = 0; i < libro.comentarios.length; i++) {
      if (libro.comentarios[i].documento._id === usuarioLogeado.usuario._id) {
        setAlerta({
          error: true,
          mensaje: "Solo puedes crear un comentario por libro",
        });
        usuarioComento = true;
        break;
      }
    }
    if (!usuarioComento) {
      fetchCrearComentario(comentario, puntuacion, usuarioComento);
    }
  }
  return (
    <>
      <center>
        <h1>{libro.titulo}</h1>
        <img
          style={{ width: "20%" }}
          src={`${libro.imagen}`}
          alt="Imagen libro"
        />
        <p className="mt-4 w-25 text-center">{libro.descripcion}</p>
        <p className="mt-2">
          Autor: <b>{libro.autor}</b>
        </p>
        <p>
          Categoria: <b>{libro.categoria}</b>
        </p>
        <p>
          Copia Virtual: <b>{libro.copiaVirtual}</b>
        </p>
        <p>
          Copias Libro: <b>{libro.copiasLibro}</b>
        </p>
        <h3>
          Puntaje promedio de la publicacion: <b>{calcularPromedioPuntaje()}</b>
        </h3>
        {botonesBorrarYEditarLibro()}
        {usuarioLogeado.logeado ? (
          <CrearComentario fetchCrearComentario={verificarComentarioUsuario} />
        ) : (
          <Link to={"/iniciar-sesion"}>Inicia sesion para comentar!</Link>
        )}
        {alerta.error ? <Alerta alerta={alerta} /> : ""}
        <ul>
          {libro.comentarios.map((comentario) => {
            return (
              <li
                key={comentario._id}
                className="w-50 mt-4"
                style={{
                  border: "1px solid black",
                  listStyle: "none",
                  padding: "20px",
                }}
              >
                {comentario.editando ? (
                  formEditarComentario(comentario._id)
                ) : (
                  <>
                    <p>Comentario: {comentario.textoComentario}</p>
                    <i>
                      Usuario: {comentario.documento.nombre}{" "}
                      {comentario.documento.apellido}
                      <br />
                      Puntuacion: {comentario.puntuacion}
                    </i>
                    <br />
                    <br />
                    {botonesBorrarYEditarComentario(
                      comentario.documento._id,
                      comentario._id
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
        {/* {verComentarios()} */}
      </center>
    </>
  );
}

export default VerLibro;
