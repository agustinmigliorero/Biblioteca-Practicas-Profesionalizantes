import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../../componentes/Alerta";

function CrearPrestamo({ usuarioLogeado }) {
  const [prestamo, setPrestamo] = useState({
    documento: "",
    idLibro: "",
    fechaDeInicio: new Date().toISOString().split("T")[0],
    fechaDeFin: new Date().toISOString().split("T")[0],
  });

  const [alerta, setAlerta] = useState({ mensaje: "", error: false });

  const { id } = useParams();
  const navigate = useNavigate();

  function handleChange(evento) {
    const inputACambiar = evento.target.name;
    const datoNuevo = evento.target.value;
    setPrestamo({ ...prestamo, [inputACambiar]: datoNuevo });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    let dateFechaDeInicio = new Date(prestamo.fechaDeInicio);
    let dateFechaDeFin = new Date(prestamo.fechaDeFin);
    //Agregarle 3 horas para evitar problemas con la diferencia horaria
    dateFechaDeInicio.setHours(dateFechaDeInicio.getHours() + 3);
    dateFechaDeFin.setHours(dateFechaDeFin.getHours() + 3);

    fetch(`${import.meta.env.VITE_API_URL}/api/prestamos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        documento: usuarioLogeado.usuario._id,
        idLibro: id,
        fechaDeInicio: dateFechaDeInicio,
        fechaDeFin: dateFechaDeFin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setAlerta({
            error: true,
            mensaje: "Las fechas son invalidas, revise los campos",
          });
        } else {
          navigate(`/usuarios/${usuarioLogeado.usuario._id}`);
        }
      });
  }

  return (
    <>
      <center>
        <h1>Realizar prestamo</h1>
        {alerta.error ? <Alerta alerta={alerta} /> : ""}
        <form onSubmit={enviarFormulario}>
          <label>Fecha de prestamo:</label>
          <br />
          <input
            type="date"
            name="fechaDeInicio"
            onChange={handleChange}
            value={prestamo.fechaDeInicio}
            min={new Date().toISOString().split("T")[0]}
          />
          <br />
          <label>Fecha de devolución:</label>
          <br />
          <input
            type="date"
            name="fechaDeFin"
            onChange={handleChange}
            value={prestamo.fechaDeFin}
            min={new Date().toISOString().split("T")[0]}
          />
          <br />
          <br />
          <input
            type="submit"
            className="btn btn-primary"
            value="Confirmar prestamo"
            onClick={enviarFormulario}
          />
        </form>
      </center>
    </>
  );
}

export default CrearPrestamo;
