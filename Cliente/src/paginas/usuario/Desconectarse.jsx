import { useEffect } from "react";

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
      <h1>Te desconectaste!</h1>
    </>
  );
}

export default Desconectarse;