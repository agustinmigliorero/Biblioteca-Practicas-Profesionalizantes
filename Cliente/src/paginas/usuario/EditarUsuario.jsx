import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarUsuario() {
  const [usuario, setUsuario] = useState({
    // dni: " ",
    nombre: " ",
    email: " ",
    rol: " ",
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
      body: JSON.stringify({
        // dni: usuario.dni,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        //console.log(data);
        navigate(`/usuarios/${id}`);
      });
  };

  function mostrarFormulario() {
    return (
      <>
        <h1>Editar al usuario</h1>
        <form onSubmit={enviarFormulario}>
          {/* <input type="number" onChange={handleChange} value={usuario.dni} placeholder="DNI" name='dni' /> */}
          <input
            type="text"
            onChange={handleChange}
            value={usuario.nombre}
            placeholder="Nombre"
            name="nombre"
          />
          <input
            type="text"
            onChange={handleChange}
            value={usuario.email}
            placeholder="Email"
            name="email"
          />
          <input
            type="text"
            onChange={handleChange}
            value={usuario.rol}
            placeholder="Rol"
            name="rol"
          />
          <input type="submit" value="Enviar" />
        </form>
      </>
    );
  }

  return <>{mostrarFormulario()}</>;
}

export default EditarUsuario;
