import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Alerta from "../componentes/Alerta.jsx";

function PaginaPrincipal () {
    const { state } = useLocation();

    return (
        <>
            {state && state.alerta && <Alerta alerta={{mensaje: state.alerta}} />}
            <center style={{marginTop: "5%"}}>
            <h1 style={{color: "rgb(10, 10, 150)", fontFamily: "Comic Sans"}}>M.A.C.E.D</h1>
            <h4 style={{color: "rgb(10, 10, 150)", fontFamily: "Comic Sans"}}>Inspirando mentes, una pagina a la vez</h4>
            </center>
        </>
    )
}

export default PaginaPrincipal;