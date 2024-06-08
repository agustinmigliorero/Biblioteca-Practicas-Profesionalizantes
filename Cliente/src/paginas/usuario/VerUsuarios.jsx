import { useState, useEffect } from 'react';

function MostrarTabla () {

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
            <td>{usuario.email}</td>
            <td>{usuario.rol}</td>
            <td>{usuario.activo ? "Si" : "No" }</td>
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
              <th>Email</th>
              <th>Rol</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>{renderizarTablas()}</tbody>
        </table>
        </>
    )
}

export default MostrarTabla