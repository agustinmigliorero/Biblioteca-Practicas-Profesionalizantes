import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Alerta from "../../componentes/Alerta";

function EditarPrestamo() {
  const [fechaDeInicio, setFechaDeInicio] = useState("");
  const [fechaDeFin, setFechaDeFin] = useState("");
  const [alerta, setAlerta] = useState({ mensaje: "", error: false });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCargarPrestamo = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/prestamos/${id}`
    );
    const data = await response.json();
    let dateFechaDeInicio = new Date(data.fechaDeInicio);
    let dateFechaDeFin = new Date(data.fechaDeFin);
    setFechaDeInicio(dateFechaDeInicio.toISOString().split("T")[0]);
    setFechaDeFin(dateFechaDeFin.toISOString().split("T")[0]);
  };

  useEffect(() => {
    fetchCargarPrestamo();
  }, []);

  const handleChangeFechaDeInicio = (evento) => {
    setFechaDeInicio(evento.target.value);
  };

  const handleChangeFechaDeFin = (evento) => {
    setFechaDeFin(evento.target.value);
  };

  const fetchEnviarFormulario = async (evento) => {
    evento.preventDefault();
    let dateFechaDeInicio = new Date(fechaDeInicio);
    let dateFechaDeFin = new Date(fechaDeFin);
    //Agregarle 3 horas para evitar problemas con la diferencia horaria
    dateFechaDeInicio.setHours(dateFechaDeInicio.getHours() + 3);
    dateFechaDeFin.setHours(dateFechaDeFin.getHours() + 3);
    await fetch(`${import.meta.env.VITE_API_URL}/api/prestamos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
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
    navigate("/prestamos");
  };

  return (
    <>
      <center>
        <h1>Editar Prestamo</h1>
        {alerta.error ? <Alerta alerta={alerta} /> : ""}
        <form>
          <label>Fecha de inicio:</label>
          <br />
          <input
            type="date"
            name="fechaDeInicio"
            onChange={handleChangeFechaDeInicio}
            value={fechaDeInicio}
          />
          <br />
          <label>Fecha de fin:</label>
          <br />
          <input
            type="date"
            name="fechaDeFin"
            onChange={handleChangeFechaDeFin}
            value={fechaDeFin}
          />
          <br />
          <br />
          <input
            type="submit"
            value="Guardar"
            onClick={fetchEnviarFormulario}
          />
        </form>
      </center>
    </>
  );
}

export default EditarPrestamo;
