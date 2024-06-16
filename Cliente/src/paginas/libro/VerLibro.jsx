import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerLibro () {

    const [libro, setLibro] = useState({});

    const { id } = useParams();

async function cargarLibro() {
    const respuesta = await fetch(`http://localhost:3000/libros/${id}`);
    const libroFetch = await respuesta.json();
    setLibro(libroFetch);
}

useEffect(() => {
    cargarLibro();
}, []);


    return (
        <>
            <h1>Ver libro</h1>
            <p>Titulo: {libro.titulo}</p>
            <p>Autor: {libro.autor}</p>
            <p>Categoria: {libro.categoria}</p>
            <p>Copia Virtual: {libro.copiaVirtual}</p>
            <p>Copias Libro: {libro.copiasLibro}</p>
        </>
    )
}

export default VerLibro;