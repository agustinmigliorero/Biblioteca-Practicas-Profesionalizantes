import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearUsuario () {
    const [usuario, setUsuario] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        rol: "",
        // activo: false,
    });
    
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
        body: JSON.stringify({
            dni: usuario.dni,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,
            rol: usuario.rol,
            // activo: usuario.activo
        }),
    })
    .then((response) => response.json())
    .then(() => {
        //console.log(data);
        navigate("/");
    });

    }
        return (
           <>
                <center>
                <h1>Crear usuario</h1>
                <form onSubmit={enviarFormulario}>
                    <label>DNI:</label><br />
                    <input type="number" onChange={handleChange} value={usuario.dni} placeholder="DNI" name="dni"/><br />
                    <label>Nombre:</label><br />
                    <input type="text" onChange={handleChange} value={usuario.nombre} placeholder="Nombre" name="nombre"/><br />  
                    <label>Apellido:</label><br />
                    <input type="text" onChange={handleChange} value={usuario.apellido} placeholder="Apellido" name="apellido"/><br />
                    <label>Email:</label><br />
                    <input type="text" onChange={handleChange} value={usuario.email} placeholder="Email" name="email"/><br />
                    <label>Contraseña:</label><br />
                    <input type="password" onChange={handleChange} value={usuario.password} placeholder="Password" name="password" /><br />
                    {/* <input type="text" onChange={handleChange} value={usuario.rol} placeholder="Rol" name="rol"/> */}
                    {/* <input type="checkbox" onChange={handleChange} value={usuario.activo} name="activo"/> */}
                    <input type="submit" value="Enviar" />
                </form>
                </center>
           </>
        );
}

export default CrearUsuario;