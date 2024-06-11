import { useState } from 'react';
import './App.css';
import CrearUsuario from './paginas/usuario/CrearUsuario.jsx';
import VerUsuarios from './paginas/usuario/VerUsuarios.jsx';
import VerUsuario from './paginas/usuario/VerUsuario.jsx';
import EditarUsuario from './paginas/usuario/EditarUsuario.jsx';
import IniciarSesion from './paginas/usuario/IniciarSesion.jsx';
import Desconectarse from './paginas/usuario/Desconectarse.jsx';
import Inicio from './paginas/Inicio.jsx'
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar.jsx'
import { useAuth } from "./UseAuth.jsx";



function App() {
  
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();

  return (
    <>
      <Navbar usuarioLogeado={usuarioLogeado}></Navbar>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* Inicio de rutas de usuarios */}
        <Route path="/registrarse" element={<CrearUsuario setUsuarioLogeado={setUsuarioLogeado} />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion setUsuarioLogeado={setUsuarioLogeado} />} />
        <Route path="/desconectarse" element={<Desconectarse setUsuarioLogeado={setUsuarioLogeado} />} />
        <Route path="/usuarios" element={<VerUsuarios />} />
        <Route path="/usuarios/:id" element={<VerUsuario />} />
        <Route path="/usuarios/editar-usuario/:id" element={<EditarUsuario />} />
        {/* Fin de rutas de usuarios */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
