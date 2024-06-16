import { useState } from "react";

function CrearComentario() {
  const [comentario, setComentario] = useState([""]);
  const [puntuacion, setPuntuacion] = useState(1);

  const handleChangeTextoComentario = (e) => {
    const inputACambiar = e.target.name;
    const datoNuevo = e.target.value;
    setComentario({ ...comentario, [inputACambiar]: datoNuevo });
  };

  const handleChangePuntuacion = (e) => {
    setPuntuacion(e.target.value);
  };

  return;
  <>
    <h1>Comentar:</h1>
    <form>
      <textarea
        type="text"
        name="comentario"
        onChange={handleChangeTextoComentario}
        value={comentario.textoComentario}
        placeholder="Comentario"
      ></textarea>
      <input
        type="number"
        onChange={handleChangePuntuacion}
        value={puntuacion}
        name="puntuacion"
      />
      <input type="submit" value="enviar" />
    </form>
  </>;
}
