import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VerUsuario () {

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
            <h1>Ver al usuario</h1>

            <p>DNI: {usuario.dni}</p>
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.email}</p>
            <p>Rol: {usuario.rol}</p>
            <p>Activo: {usuario.activo ? "Si" : "No" }</p>
        </>
    )
}

export default VerUsuario