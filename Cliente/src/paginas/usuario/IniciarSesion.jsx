import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alerta from "../../componentes/Alerta.jsx";

function IniciarSesion({ setUsuarioLogeado }) {
  const [usuario, setUsuario] = useState({
    dni: "",
    password: "",
  });

  const [alerta, setAlerta] = useState({ mensaje: "", error: false });

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleChange = (evento) => {
    const inputACambiar = evento.target.name;
    const datoNuevo = evento.target.value;
    setUsuario({ ...usuario, [inputACambiar]: datoNuevo });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/iniciar-sesion`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario.dni,
        password: usuario.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.logeado) {
          setUsuarioLogeado(data);
          navigate("/");
        } else if (data.error) {
          setAlerta({
            error: true,
            mensaje: "Error al iniciar sesion, revisa todos los campos.",
          });
        }
      });
  };
  return (
    <>
      <center>
        {state ? (
          <h2
            style={{
              backgroundColor: "red",
              color: "white",
              margin: "auto",
              marginTop: 0,
              marginBottom: 0,
              textAlign: "center",
              width: "50%",
              padding: "10px",
            }}
          >
            {state.alerta}
          </h2>
        ) : (
          ""
        )}
        <h1>Iniciar Sesion</h1>
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

export default IniciarSesion;
