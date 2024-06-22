import { useState } from "react";
import { useParams } from "react-router-dom";

function CrearReserva({ usuarioLogeado }) {
  const [reserva, setReserva] = useState({
    documento: "",
    idLibro: "",
    fechaReserva: "",
    fechaDevolucion: "",
  });

  const { id } = useParams();

  function handleChange(evento) {
    const inputACambiar = evento.target.name;
    const datoNuevo = evento.target.value;
    setReserva({ ...reserva, [inputACambiar]: datoNuevo });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/api/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        documento: usuarioLogeado.usuario._id,
        idLibro: id,
        fechaReserva: reserva.fechaReserva,
        fechaDevolucion: reserva.fechaDevolucion,
      }),
    });
  }

  return (
    <div>
      <h1>Reservar libros</h1>
      <form>
        <label>Fecha de reserva:</label>
        <br />
        <input
          type="date"
          name="fechaReserva"
          onChange={handleChange}
          value={reserva.fechaReserva}
        />
        <br />
        <label>Fecha de devolución:</label>
        <br />
        <input
          type="date"
          name="fechaDevolucion"
          onChange={handleChange}
          value={reserva.fechaDevolucion}
        />
        <br />
        <input type="submit" value="Reservar" onClick={enviarFormulario} />
      </form>
    </div>
  );
}

export default CrearReserva;
