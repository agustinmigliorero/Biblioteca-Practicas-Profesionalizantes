import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CrearReserva({ usuarioLogeado }) {
  const [reserva, setReserva] = useState({
    documento: "",
    idLibro: "",
    fechaReserva: new Date().toISOString().split("T")[0],
    fechaDevolucion: new Date().toISOString().split("T")[0],
  });

  const { id } = useParams();
  const navigate = useNavigate();

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
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          navigate(-1);
        }
      });
  }

  return (
    <div>
      <center>
        <h1>Reservar libros</h1>
        <form>
          <label>Fecha de reserva:</label>
          <br />
          <input
            type="date"
            name="fechaReserva"
            onChange={handleChange}
            value={reserva.fechaReserva}
            min={new Date().toISOString().split("T")[0]}
          />
          <br />
          <label>Fecha de devolución:</label>
          <br />
          <input
            type="date"
            name="fechaDevolucion"
            onChange={handleChange}
            value={reserva.fechaDevolucion}
            min={new Date().toISOString().split("T")[0]}
          />
          <br />
          <br />
          <input
            className="btn btn-primary"
            type="submit"
            value="Reservar"
            onClick={enviarFormulario}
          />
        </form>
      </center>
    </div>
  );
}

export default CrearReserva;
