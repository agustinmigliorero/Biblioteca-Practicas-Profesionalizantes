import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VerUsuario() {
  const [usuario, setUsuario] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  async function cargarUsuario() {
    const respuesta = await fetch(`http://localhost:3000/usuarios/${id}`);
    const usuarioFetch = await respuesta.json();
    setUsuario(usuarioFetch);
  }

  useEffect(() => {
    cargarUsuario();
  }, []);

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
      </center>
    </>
  );
}

export default VerUsuario;
