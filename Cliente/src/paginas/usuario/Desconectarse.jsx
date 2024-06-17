import { useEffect } from "react";
import fondoPagina from "../../assets/fondo_paginas.svg";

function Desconectarse({ setUsuarioLogeado }) {
  async function desconectarUsuario() {
    fetch("http://localhost:3000/usuarios/desconectarse", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsuarioLogeado(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    desconectarUsuario();
  }, []);

  return (
    <>
      <center style={{ marginTop: "2%" }}>
        <h1 className="mb-4">Te desconectaste!</h1>
        <img src={fondoPagina} style={{ width: "30%" }} alt="fondo_pagina" />
      </center>
    </>
  );
}

export default Desconectarse;
