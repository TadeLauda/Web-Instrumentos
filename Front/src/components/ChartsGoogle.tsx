/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Navbar from "./Navbar";

export const optionsBar = {
    title: "Historial de pedidos",
    chartArea: { width: "50%" },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
        title: "Pedidos",
        minValue: 0,
    },
    vAxis: {
        title: "Fecha",
    }
};

export const optionsPie = {
    title: "Cantidad de Pedidos por Instrumento",
};

function ChartsGoogle() {

    const [datosChartBar, setDatosChartBar] = useState<any>();
    const [datosChartPie, setDatosChartPie] = useState<any>();

    const getBarChart = async () => {
        const response = await fetch('http://localhost:8080/pedidos/barchart');
        const datosBackend = await response.json();
        console.log(datosBackend);
        setDatosChartBar(datosBackend);
    }
    
    const getPieChart = async () => {
        const response = await fetch('http://localhost:8080/pedidos/piechart');
        const datosBackend = await response.json();
        console.log(datosBackend);
        setDatosChartPie(datosBackend);
    }

    useEffect(() => {
        getBarChart();
        getPieChart();
    }, []);


    return (
        
        <>
        <Navbar />
        <div style={{ maxWidth: '90%', margin: '100px 100px', }}> {/* Establece el ancho máximo y centra el contenido */}
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={datosChartBar}
                    options={optionsBar}
                />
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={datosChartPie}
                    options={optionsPie}
                />
            </div>
        </>
    )
}

export default ChartsGoogle