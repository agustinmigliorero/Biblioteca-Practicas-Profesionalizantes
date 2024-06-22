import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditarReserva() {
  const [fechaReserva, setFechaReserva] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCargarReserva = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reservas/${id}`
    );
    const data = await response.json();
    let dateFechaReserva = new Date(data.fechaReserva);
    let dateFechaDevolucion = new Date(data.fechaDevolucion);
    setFechaReserva(dateFechaReserva.toISOString().split("T")[0]);
    setFechaDevolucion(dateFechaDevolucion.toISOString().split("T")[0]);
  };

  useEffect(() => {
    fetchCargarReserva();
  }, []);

  const handleChangeFechaReserva = (evento) => {
    setFechaReserva(evento.target.value);
  };

  const handleChangeFechaDevolucion = (evento) => {
    setFechaDevolucion(evento.target.value);
  };

  const fetchEnviarFormulario = async (evento) => {
    evento.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/reservas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fechaReserva: fechaReserva,
        fechaDevolucion: fechaDevolucion,
      }),
    });
    navigate("/reservas");
  };

  return (
    <>
      <center>
        <h1>Editar Reserva</h1>
        <form>
          <label>Fecha de reserva:</label>
          <br />
          <input
            type="date"
            name="fechaReserva"
            onChange={handleChangeFechaReserva}
            value={fechaReserva}
          />
          <br />
          <label>Fecha de devolución:</label>
          <br />
          <input
            type="date"
            name="fechaDevolucion"
            onChange={handleChangeFechaDevolucion}
            value={fechaDevolucion}
          />
          <br />
          <br />
          <input
            className="btn btn-primary"
            type="submit"
            value="Editar reserva"
            onClick={fetchEnviarFormulario}
          />
        </form>
        <br />
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </center>
    </>
  );
}

export default EditarReserva;
