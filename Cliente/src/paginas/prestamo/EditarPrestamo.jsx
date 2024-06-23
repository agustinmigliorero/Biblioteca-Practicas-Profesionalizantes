import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditarPrestamo() {
  const [fechaDeInicio, setFechaDeInicio] = useState("");
  const [fechaDeFin, setFechaDeFin] = useState("");
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
    await fetch(`${import.meta.env.VITE_API_URL}/api/prestamos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fechaDeInicio: fechaDeInicio,
        fechaDeFin: fechaDeFin,
      }),
    });
    navigate("/prestamos");
  };

  return (
    <>
      <center>
        <h1>Editar Prestamo</h1>
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
