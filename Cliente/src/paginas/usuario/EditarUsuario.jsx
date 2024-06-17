import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarUsuario({ usuarioLogeado }) {
  const [usuario, setUsuario] = useState({
    // dni: "",
    nombre: "",
    apellido: "",
    email: "",
    rol: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  function handleChange(evento) {
    const inputACambiar = evento.target.name;
    const datoNuevo = evento.target.value;
    setUsuario({ ...usuario, [inputACambiar]: datoNuevo });
  }

  async function cargarUsuario() {
    const respuesta = await fetch(`http://localhost:3000/usuarios/${id}`);
    const usuarioFetch = await respuesta.json();
    setUsuario(usuarioFetch);
    if (
      usuarioFetch._id !== usuarioLogeado.usuario._id &&
      usuarioLogeado.usuario.rol !== "Administrativo"
    ) {
      navigate("/", {
        state: { alerta: "No tienes permisos para editar este usuario!" },
      });
    }
  }

  useEffect(() => {
    cargarUsuario();
  }, []);

  const enviarFormulario = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        // dni: usuario.dni,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        activo: usuario.activo,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  function mostrarFormulario() {
    return (
      <>
        <center>
          <h1>Editar al usuario</h1>
          <form onSubmit={enviarFormulario}>
            {/* <input type="number" onChange={handleChange} value={usuario.dni} placeholder="DNI" name='dni' /> */}
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              onChange={handleChange}
              value={usuario.nombre}
              placeholder="Nombre"
              name="nombre"
            />
            <br />
            <label>Apellido:</label>
            <br />
            <input
              type="text"
              onChange={handleChange}
              value={usuario.apellido}
              placeholder="Apellido"
              name="apellido"
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="email"
              onChange={handleChange}
              value={usuario.email}
              placeholder="Email"
              name="email"
            />
            <br />
            {/* <input type="text" onChange={handleChange} value={usuario.rol} placeholder="Rol" name='rol' /> */}
            <label>Rol:</label>
            <br />
            <select onChange={handleChange} value={usuario.rol} name="rol">
              <option value="Estudiante">Estudiante</option>
              <option value="Bibliotecario">Bibliotecario</option>
              <option value="Administrativo">Administrativo</option>
            </select>
            <br />
            <label>Activo:</label>
            <br />
            <select
              onChange={handleChange}
              value={usuario.activo}
              name="activo"
            >
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
            <br />
            <button type="submit" className="btn btn-success">
              Enviar
            </button>
          </form>
        </center>
      </>
    );
  }

  return <>{mostrarFormulario()}</>;
}

export default EditarUsuario;
