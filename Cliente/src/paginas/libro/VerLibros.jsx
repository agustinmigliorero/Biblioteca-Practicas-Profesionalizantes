import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VerLibros() {
    const [libros, setLibros] = useState([]);

    async function cargarLibros() {
        const respuesta = await fetch("http://localhost:3000/libros");
        const librosFetch = await respuesta.json();
        setLibros(librosFetch);
    }

    useEffect(() => {
        cargarLibros();
    }, []);

    function renderizarTablas() {
        return libros.map((libro, index) => (
            <tr key={index}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.categoria}</td>
                <td>{libro.copiaVirtual}</td>
                <td>{libro.copiasLibro}</td>
                <td>
                    <Link className="btn btn-success" to={`/libros/${libro._id}`}>
                        Ver
                    </Link>
                    <Link
                        className="btn btn-warning"
                        to={`/libros/editar-libro/${libro._id}`}
                    >
                        Editar
                    </Link>
                </td>
            </tr>
        ));
    }


    return (
        <>
            <h1>Libros</h1>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Copia Virtual</th>
                        <th>Copias Libro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {renderizarTablas()}
                </tbody>
            </table>
        </>
    );
}

export default VerLibros;