import { NavLink } from "react-router-dom";
import barraTareas from "../assets/barra_blanca.svg";

function Navbar({ usuarioLogeado }) {
  const linksConectado = () => {
    if (usuarioLogeado.logeado) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`/usuarios/${usuarioLogeado.usuario._id}`}
            >
              Ver Perfil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`/desconectarse`}>
              Desconectarse
            </NavLink>
          </li>
        </>
      );
    }
  };

  const linksDesconectado = () => {
    if (!usuarioLogeado.logeado) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/iniciar-sesion">
              Iniciar Sesion
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/registrarse">
              Registrarse
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img style={{ width: "80%" }} src={barraTareas} alt="" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/usuarios">
                VerUsuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/registrar-libro">
                Registrar Libros
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/libros">
                Ver Libros
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            {linksConectado()}
            {linksDesconectado()}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
