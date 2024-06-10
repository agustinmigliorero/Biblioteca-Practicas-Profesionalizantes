import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MostrarTabla() {
  const [usuarios, setUsuarios] = useState([]);

  async function cargarUsuarios() {
    const respuesta = await fetch("http://localhost:3000/usuarios");
    const usuariosFetch = await respuesta.json();
    setUsuarios(usuariosFetch);
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function renderizarTablas() {
    return usuarios.map((usuario, index) => (
      <tr key={index}>
        <td>{usuario.dni}</td>
        <td>{usuario.nombre}</td>
        <td>{usuario.apellido}</td>
        <td>{usuario.email}</td>
        <td>{usuario.rol}</td>
        <td>{usuario.activo ? "Si" : "No"}</td>
        <td>
          <Link className="btn btn-success" to={`/usuarios/${usuario._id}`}>
            Ver
          </Link>
          <Link
            className="btn btn-warning"
            to={`/usuarios/editar-usuario/${usuario._id}`}
          >
            Editar
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <h1>Usuarios creados</h1>

      <table className="table">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{renderizarTablas()}</tbody>
      </table>
    </>
  );
}

export default MostrarTabla;
