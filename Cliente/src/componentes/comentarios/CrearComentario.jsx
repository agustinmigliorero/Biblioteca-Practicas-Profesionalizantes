import { useState } from "react";

function CrearComentario({ fetchCrearComentario }) {
  const [comentario, setComentario] = useState([""]);
  const [puntuacion, setPuntuacion] = useState(10);

  const handleChangeTextoComentario = (evento) => {
    setComentario(evento.target.value);
  };

  const handleChangePuntuacion = (evento) => {
    setPuntuacion(evento.target.value);
  };

  const enviarComentario = (evento) => {
    evento.preventDefault();
    fetchCrearComentario(comentario, puntuacion);
    setComentario("");
    setPuntuacion(10);
  };

  return (
    <>
      <h1>Comentar:</h1>
      <form onSubmit={enviarComentario}>
        <textarea
          type="text"
          name="comentario"
          onChange={handleChangeTextoComentario}
          value={comentario}
          placeholder="Escriba un comentario"
          rows="8"
          cols="60"
        ></textarea>
        <br />
        <label>Puntuacion: </label>
        <br />
        <input
          type="number"
          onChange={handleChangePuntuacion}
          value={puntuacion}
          name="puntuacion"
          min={1}
          max={10}
        />
        <br />
        <br />
        <button type="submit" className="btn btn-success">
          Enviar
        </button>
      </form>
    </>
  );
}

export default CrearComentario;
