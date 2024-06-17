import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../../componentes/Alerta";

function CrearLibro() {
  const [libro, setLibro] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    copiaVirtual: "",
    copiasLibro: "",
    descripcion: "",
    imagen: "",
  });

  const [alerta, setAlerta] = useState({ mensaje: "", error: false });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputACambiar = e.target.name;
    const datoNuevo = e.target.value;
    setLibro({ ...libro, [inputACambiar]: datoNuevo });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/libros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        titulo: libro.titulo,
        autor: libro.autor,
        categoria: libro.categoria,
        copiaVirtual: libro.copiaVirtual,
        copiasLibro: libro.copiasLibro,
        imagen: libro.imagen,
        descripcion: libro.descripcion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlerta({
            error: true,
            mensaje: "Error al crear el libro, revise los campos",
          });
        } else {
          navigate("/libros");
        }
      });
  };

  return (
    <div>
      <center>
        <h1>Registrar libro:</h1>
        <form onSubmit={enviarFormulario}>
          <label>Titulo:</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            value={libro.titulo}
            name="titulo"
            placeholder="Titulo"
          />
          <br />
          <label>Autor:</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            value={libro.autor}
            name="autor"
            placeholder="Autor"
          />
          <br />
          <label>Categoria:</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            value={libro.categoria}
            name="categoria"
            placeholder="Categoria"
          />
          <br />
          <label>Copia Virtual:</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            value={libro.copiaVirtual}
            name="copiaVirtual"
            placeholder="URL de la Copia Virtual"
          />
          <br />
          <label>Copias Libro:</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            value={libro.copiasLibro}
            name="copiasLibro"
            placeholder="Copias del Libro"
          />
          <br />

          <label>Imagen:</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            value={libro.imagen}
            name="imagen"
            placeholder="URL de la imagen"
          />
          <br />
          <br />

          <textarea
            type="text"
            name="descripcion"
            onChange={handleChange}
            value={libro.descripcion}
            placeholder="Descripcion"
            rows="8"
            cols="60"
          ></textarea>
          <br />
          <button type="submit" className="btn btn-success">
            Enviar
          </button>
        </form>
        {alerta.error ? <Alerta alerta={alerta} /> : ""}
      </center>
    </div>
  );
}
export default CrearLibro;
