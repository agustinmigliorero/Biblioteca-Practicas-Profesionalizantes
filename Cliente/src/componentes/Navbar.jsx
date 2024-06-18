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
              Hola {usuarioLogeado.usuario.nombre}!
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

  const linksAdministrador = () => {
    if (
      usuarioLogeado.logeado &&
      usuarioLogeado.usuario.rol === "Administrativo"
    ) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/usuarios">
              Ver Usuarios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/registrar-libro">
              Registrar Libros
            </NavLink>
          </li>
        </>
      );
    }
  };

  const linksBibliotecario = () => {
    if (
      usuarioLogeado.logeado &&
      usuarioLogeado.usuario.rol === "Bibliotecario"
    ) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/usuarios">
              Ver Usuarios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/registrar-libro">
              Registrar Libros
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
            {linksAdministrador()}
            {linksBibliotecario()}
            <li>
              <NavLink className="nav-link" to="/libros">
                Ver Libros
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
            {linksConectado()}
            {linksDesconectado()}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
