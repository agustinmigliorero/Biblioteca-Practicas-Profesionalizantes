import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../../componentes/Alerta";

function CrearReserva({ usuarioLogeado }) {
  const [reserva, setReserva] = useState({
    documento: "",
    idLibro: "",
    fechaReserva: new Date().toISOString().split("T")[0],
    fechaDevolucion: new Date().toISOString().split("T")[0],
  });

  const [alerta, setAlerta] = useState({ mensaje: "", error: false });

  const { id } = useParams();
  const navigate = useNavigate();

  function handleChange(evento) {
    const inputACambiar = evento.target.name;
    const datoNuevo = evento.target.value;
    setReserva({ ...reserva, [inputACambiar]: datoNuevo });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    let dateFechaReserva = new Date(reserva.fechaReserva);
    let dateFechaDevolucion = new Date(reserva.fechaDevolucion);
    //Agregarle 3 horas para evitar problemas con la diferencia horaria
    dateFechaReserva.setHours(dateFechaReserva.getHours() + 3);
    dateFechaDevolucion.setHours(dateFechaDevolucion.getHours() + 3);
    fetch(`${import.meta.env.VITE_API_URL}/api/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        documento: usuarioLogeado.usuario._id,
        idLibro: id,
        fechaReserva: dateFechaReserva,
        fechaDevolucion: dateFechaDevolucion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setAlerta({
            error: true,
            mensaje: "Las fechas son invalidas, revise los campos",
          });
        } else {
          navigate(`/usuarios/${usuarioLogeado.usuario._id}`);
        }
      });
  }

  return (
    <div>
      <center>
        <h1>Reservar libros</h1>
        {alerta.error ? <Alerta alerta={alerta} /> : ""}
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
