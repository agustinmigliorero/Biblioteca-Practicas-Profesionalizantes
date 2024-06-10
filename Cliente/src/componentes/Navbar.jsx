import { NavLink } from "react-router-dom";

function Navbar({ usuarioLogeado }) {
  console.log(usuarioLogeado)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Biblioteca</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Inicio</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/usuarios">VerUsuarios</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/registrarse">Registrarse</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/iniciar-sesion">Iniciar Sesion</NavLink>
        </li>
      </ul>
    </div>
  </div>

  {/* {usuarioLogeado.logeado ? usuarioLogeado.usuario.nombre + " " + usuarioLogeado.usuario.apellido : ""} */}
</nav>
    );
}
export default Navbar;