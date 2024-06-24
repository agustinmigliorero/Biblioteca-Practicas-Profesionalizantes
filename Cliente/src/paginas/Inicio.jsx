import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Alerta from "../componentes/Alerta.jsx";
import fondoPagina from "../assets/fondo_paginas.svg";

function PaginaPrincipal() {
  const { state } = useLocation();
  console.log(import.meta.env.VITE_API_URL);
  return (
    <>
      {state ? (
        <h2
          style={{
            backgroundColor: "red",
            color: "white",
            margin: "auto",
            marginTop: 0,
            marginBottom: 0,
            textAlign: "center",
            width: "50%",
            padding: "10px",
          }}
        >
          {state.alerta}
        </h2>
      ) : (
        ""
      )}
      <center style={{ marginTop: "3%" }}>
        <img src={fondoPagina} style={{ width: "30%" }} alt="fondo_pagina" />
      </center>
    </>
  );
}

export default PaginaPrincipal;
