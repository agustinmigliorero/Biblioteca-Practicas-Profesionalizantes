import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditarLibro () {

    const [libro, setLibro] = useState({});
    const { id } = useParams();

    function handleChange(e) {
        const inputACambiar = e.target.name;
        const datoNuevo = e.target.value;
        setLibro({ ...libro, [inputACambiar]: datoNuevo });
    }

    async function cargarLibro() {
        const respuesta = await fetch(`http://localhost:3000/libros/${id}`);
        const libroFetch = await respuesta.json();
        setLibro(libroFetch);
    }

    useEffect(() => {
        cargarLibro();
    }, []);

    const enviarFormulario = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3000/libros/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(
                {
                    titulo: libro.titulo,
                    autor: libro.autor,
                    categoria: libro.categoria,
                    copiaVirtual: libro.copiaVirtual,
                    copiasLibro: libro.copiasLibro,
                }
            ),
        });
    };


    function mostrarFormulario() {

        return (
            <>
            <h1>Editar libro</h1>
            <form onSubmit={enviarFormulario}>
                <label>Titulo:</label><br />
                <input type="text" onChange={handleChange} value={libro.titulo} name="titulo" placeholder="Titulo" /><br />
                <label>Autor:</label><br />
                <input type="text" onChange={handleChange} value={libro.autor} name="autor" placeholder="Autor" /><br />
                <label>Categoria:</label><br />
                <input type="text" onChange={handleChange} value={libro.categoria} name="categoria" placeholder="Categoria" /><br />
                <label>Copia Virtual:</label><br />
                <input type="text" onChange={handleChange} value={libro.copiaVirtual} name="copiaVirtual" placeholder="URL de la Copia Virtual" /><br />
                <label>Copias Libro:</label><br />
                <input type="number" onChange={handleChange} value={libro.copiasLibro} name="copiasLibro" placeholder="Copias del Libro" /><br />

                <input type="submit" value="Enviar" />
            </form>
        </>
        )
    }


    return (
        <>
           {mostrarFormulario()}
        </>
    )
}

export default EditarLibro;