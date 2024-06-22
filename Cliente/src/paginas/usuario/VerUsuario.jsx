import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function VerUsuario() {
  const [usuario, setUsuario] = useState({
    reservas: [],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  async function cargarUsuario() {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/usuarios/${id}`
    );
    const usuarioFetch = await respuesta.json();
    setUsuario(usuarioFetch);
  }

  useEffect(() => {
    cargarUsuario();
  }, []);

  function verReservas() {
    return usuario.reservas.map((reserva) => {
      let dateFechaReserva = new Date(reserva.fechaReserva);
      let dateFechaDevolucion = new Date(reserva.fechaDevolucion);
      return (
        <tr key={reserva._id}>
          <td>{reserva.idLibro.titulo}</td>
          <td>{`${dateFechaReserva.getDate()}/${
            dateFechaReserva.getMonth() + 1
          }/${dateFechaReserva.getFullYear()}`}</td>
          <td>{`${dateFechaDevolucion.getDate()}/${
            dateFechaDevolucion.getMonth() + 1
          }/${dateFechaDevolucion.getFullYear()}`}</td>
          <td>{reserva.estadoReserva ? "Activa" : "Finalizada"}</td>
          <td>
            <Link to={`/reservas/editar-reserva/${reserva._id}`}>Editar</Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <center className="mt-5">
        <h1>
          {usuario.nombre} {usuario.apellido}
        </h1>

        <p>
          DNI: <b>{usuario.dni}</b>
        </p>
        <p>
          Nombre: <b>{usuario.nombre}</b>
        </p>
        <p>
          Apellido: <b>{usuario.apellido}</b>
        </p>
        <p>
          Email: <b>{usuario.email}</b>
        </p>
        <p>
          Rol: <b>{usuario.rol}</b>
        </p>
        <p>
          Activo: <b>{usuario.activo ? "Si" : "No"}</b>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Inicio de la reserva</th>
              <th>Fin de la reserva</th>
              <th>Estado de la reserva</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{verReservas()}</tbody>
        </table>
      </center>
    </>
  );
}

export default VerUsuario;
