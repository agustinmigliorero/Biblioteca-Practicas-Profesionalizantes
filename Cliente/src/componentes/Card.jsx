function Card({ libro }) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Titulo: {libro.titulo}</h5>
          <p className="card-text">Autor: {libro.autor}</p>
          <p className="card-text">Categoria: {libro.categoria}</p>
          <p className="card-text">URL: {libro.copiaVirtual}</p>
          <p className="card-text">Copias: {libro.copiasLibro}</p>
          <a href={"/libros/" + libro._id} className="btn btn-primary">
            Ver libro
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
