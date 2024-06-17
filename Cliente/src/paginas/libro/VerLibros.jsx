import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../componentes/Card";

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

  const renderizarCards = () => {
    return libros.map((libro, index) => (
      <div className="col-12 col-md-4 col-sm-6">
        <center>
          <Card key={index} libro={libro} />
        </center>
      </div>
    ));
  };

  return (
    <>
      <div className="container text-center">
        <h1 className="text-center mt-4 mb-4">Libros</h1>
        <div className="row justify-content-center">{renderizarCards()}</div>
      </div>
    </>
  );
}

export default VerLibros;
