import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Alerta from "../componentes/Alerta.jsx";
import fondoPagina from "../assets/fondo_paginas.svg";

function PaginaPrincipal() {
  const { state } = useLocation();

  return (
    <>
      {state && state.alerta && <Alerta alerta={{ mensaje: state.alerta }} />}
      <center style={{ marginTop: "3%" }}>
        <img src={fondoPagina} style={{ width: "30%" }} alt="fondo_pagina" />
      </center>
    </>
  );
}

export default PaginaPrincipal;
