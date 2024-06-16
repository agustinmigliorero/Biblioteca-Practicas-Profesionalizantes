function Card ({ libro}) {

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{libro.titulo}</h5>
                    <p className="card-text">{libro.autor}</p>
                    <p className="card-text">{libro.categoria}</p>
                    <p className="card-text">{libro.copiaVirtual}</p>
                    <p className="card-text">{libro.copiasLibro}</p>
                    <a href={"/libros/" + libro._id} className="btn btn-primary">Ver libro</a>
                </div>
            </div>
        </>
    );
}

export default Card