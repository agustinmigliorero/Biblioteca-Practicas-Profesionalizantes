import "./App.css";
import CrearUsuario from "./paginas/usuario/CrearUsuario.jsx";
import VerUsuarios from "./paginas/usuario/VerUsuarios.jsx";
import VerUsuario from "./paginas/usuario/VerUsuario.jsx";
import EditarUsuario from "./paginas/usuario/EditarUsuario.jsx";
import IniciarSesion from "./paginas/usuario/IniciarSesion.jsx";
import Desconectarse from "./paginas/usuario/Desconectarse.jsx";
import CrearLibro from "./paginas/libro/CrearLibro.jsx";
import VerLibros from "./paginas/libro/VerLibros.jsx";
import VerLibro from "./paginas/libro/VerLibro.jsx";
import EditarLibro from "./paginas/libro/EditarLibro.jsx";
import Inicio from "./paginas/Inicio.jsx";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./componentes/Navbar.jsx";
import Footer from "./componentes/Footer.jsx";
import { useAuth } from "./UseAuth.jsx";

function RutaProtegidaLogeado({ children }) {
  const { usuarioLogeado, cargando } = useAuth();
  console.log(usuarioLogeado, cargando);
  if (cargando) {
    return "";
  }
  return usuarioLogeado.logeado ? (
    children
  ) : (
    <Navigate to="/" state={{ alerta: "No estas logeado!" }} />
  );
}

function RutaProtegidaAdministrativo({ children }) {
  const { usuarioLogeado, cargando } = useAuth();
  if (cargando) {
    return "";
  }
  return usuarioLogeado.logeado &&
    usuarioLogeado.usuario.rol === "Administrativo" ? (
    children
  ) : (
    <Navigate to="/" state={{ alerta: "No eres administrador!" }} />
  );
}

function RutaProtegidaBibliotecario({ children }) {
  const { usuarioLogeado, cargando } = useAuth();
  if (cargando) {
    return "";
  }
  return usuarioLogeado.logeado &&
    (usuarioLogeado.usuario.rol === "Bibliotecario" ||
      usuarioLogeado.usuario.rol === "Administrativo") ? (
    children
  ) : (
    <Navigate to="/" state={{ alerta: "No eres bibliotecario!" }} />
  );
}

function App() {
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar usuarioLogeado={usuarioLogeado}></Navbar>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* Inicio de rutas de usuarios */}
        <Route
          path="/registrarse"
          element={<CrearUsuario setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route
          path="/iniciar-sesion"
          element={<IniciarSesion setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route
          path="/desconectarse"
          element={<Desconectarse setUsuarioLogeado={setUsuarioLogeado} />}
        />
        <Route path="/usuarios" element={<VerUsuarios />} />
        <Route path="/usuarios/:id" element={<VerUsuario />} />
        <Route
          path="/usuarios/editar-usuario/:id"
          element={
            <RutaProtegidaLogeado>
              <EditarUsuario usuarioLogeado={usuarioLogeado} />
            </RutaProtegidaLogeado>
          }
        />
        {/* Fin de rutas de usuarios */}
        {/* Inicio de rutas de libros */}
        <Route
          path="/registrar-libro"
          element={
            <RutaProtegidaBibliotecario>
              <CrearLibro usuarioLogeado={usuarioLogeado} />
            </RutaProtegidaBibliotecario>
          }
        />
        <Route path="/libros" element={<VerLibros />} />
        <Route
          path="/libros/:id"
          element={<VerLibro usuarioLogeado={usuarioLogeado} />}
        />
        <Route
          path="/libros/editar-libro/:id"
          element={
            <RutaProtegidaBibliotecario>
              <EditarLibro usuarioLogeado={usuarioLogeado} />
            </RutaProtegidaBibliotecario>
          }
        />
        {/* Fin de rutas de libros */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
