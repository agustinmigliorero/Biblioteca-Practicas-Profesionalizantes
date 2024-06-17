import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../../componentes/Alerta.jsx";

function CrearUsuario({ setUsuarioLogeado }) {
  const [usuario, setUsuario] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    // activo: false,
  });

  const [alerta, setAlerta] = useState({ mensaje: "", error: false });

  const navigate = useNavigate();

  const handleChange = (evento) => {
    const inputACambiar = evento.target.name;
    const datoNuevo = evento.target.value;
    setUsuario({ ...usuario, [inputACambiar]: datoNuevo });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        dni: usuario.dni,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        password: usuario.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsuarioLogeado(data);
        if (data.logeado) {
          navigate("/");
        } else if (data.error) {
          setAlerta({
            error: true,
            mensaje: "Error al crear el usuario, revisa todos los campos.",
          });
        }
      });
  };
  return (
    <>
      <center>
        <h1>Crear usuario</h1>
        <form onSubmit={enviarFormulario}>
          <label>DNI:</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            value={usuario.dni}
            placeholder="DNI"
            name="dni"
          />
          <br />
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
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            onChange={handleChange}
            value={usuario.password}
            placeholder="Password"
            name="password"
          />
          <br />
          {/* <input type="text" onChange={handleChange} value={usuario.rol} placeholder="Rol" name="rol"/> */}
          {/* <input type="checkbox" onChange={handleChange} value={usuario.activo} name="activo"/> */}
          <button type="submit" className="btn btn-success">
            Enviar
          </button>
        </form>

        <div>{alerta.error ? <Alerta alerta={alerta} /> : ""}</div>
      </center>
    </>
  );
}

export default CrearUsuario;
