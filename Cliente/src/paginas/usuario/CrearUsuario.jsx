import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearUsuario() {
  const [usuario, setUsuario] = useState({
    dni: "",
    nombre: "",
    email: "",
    rol: "",
  });

  const navigate = useNavigate();

  const handleChange = (evento) => {
    const inputACambiar = evento.target.name;
    const datoNuevo = evento.target.value;
    setUsuario({ ...usuario, [inputACambiar]: datoNuevo });
  };

  const enviarFormulario = () => {
    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dni: usuario.dni,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        //console.log(data);
        navigate("/");
      });
  };
  return (
    <>
      <h1>Crear usuario</h1>
      <form onSubmit={enviarFormulario}>
        <input
          type="number"
          onChange={handleChange}
          value={usuario.dni}
          placeholder="DNI"
          name="dni"
        />
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

export default CrearUsuario;
