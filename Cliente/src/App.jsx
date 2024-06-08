import { useState } from 'react';
import './App.css';
import CrearUsuario from './paginas/usuario/CrearUsuario.jsx';
import VerUsuarios from './paginas/usuario/VerUsuarios.jsx';
import VerUsuario from './paginas/usuario/VerUsuario.jsx';
import EditarUsuario from './paginas/usuario/EditarUsuario.jsx';
import Inicio from './paginas/Inicio.jsx'
import { Route, Routes, Navigate } from 'react-router-dom';



function App() {
  


  return (
    <>

      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* Inicio de rutas de usuarios */}
        <Route path="/usuarios/registrarse" element={<CrearUsuario />} />
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
