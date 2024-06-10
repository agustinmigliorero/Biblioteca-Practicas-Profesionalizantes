import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarUsuario () {

const [usuario, setUsuario] = useState({
    // dni: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
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
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,
            rol: usuario.rol,
            activo: usuario.activo
        }),
    })
    .then((response) => response.json())
    .then(() => {
        //console.log(data);
        navigate("/");
    });
}

function mostrarFormulario() {
    return (
        <>
            <center>
            <h1>Editar al usuario</h1>
            <form onSubmit={enviarFormulario}>
                {/* <input type="number" onChange={handleChange} value={usuario.dni} placeholder="DNI" name='dni' /> */}
                <label>Nombre:</label><br />
                <input type="text" onChange={handleChange} value={usuario.nombre} placeholder="Nombre" name='nombre' /><br />
                <label>Apellido:</label><br />
                <input type="text" onChange={handleChange} value={usuario.apellido} placeholder="Apellido" name='apellido' /><br />
                <label>Email:</label><br />
                <input type="email" onChange={handleChange} value={usuario.email} placeholder="Email" name='email' /><br />
                <label>Contraseña:</label><br />
                <input type="password" onChange={handleChange} value={usuario.password} placeholder="Contraseña" name='password' /><br />
                {/* <input type="text" onChange={handleChange} value={usuario.rol} placeholder="Rol" name='rol' /> */}
                <label>Rol:</label><br />
                <select onChange={handleChange} value={usuario.rol} name="rol">
                    <option value="Estudiante">Estudiante</option>
                    <option value="Bibliotecario">Bibliotecario</option>
                    <option value="Administrativo">Administrativo</option>
                </select><br />
                <label>Activo:</label><br />
                <select onChange={handleChange} value={usuario.activo} name="activo">
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select><br />
                <input type="submit" value="Enviar" />
            </form>
            </center>
        </>
    )
}


    return (
        <>
            {mostrarFormulario()}
        </>
    )
}

export default EditarUsuario