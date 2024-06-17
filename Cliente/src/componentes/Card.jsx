function Card({ libro }) {
  return (
    <>
      {/* <div className="card" style={{ width: "18rem" }}>
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
      </div> */}

      <div
        className="card"
        key={libro._id.toString() + 1}
        style={{ width: "18rem" }}
      >
        {libro.imagen ? (
          <img src={libro.imagen} className="card-img-top" alt="..." />
        ) : null}
        <div className="card-body">
          <h4 className="card-title">{libro.titulo}</h4>
          <p className="card-text">{libro.descripcion}</p>
          <p className="card-text">
            <i>Autor: {libro.autor}</i>
          </p>
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
