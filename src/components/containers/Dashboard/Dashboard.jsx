import React from "react";
import LineChart from "./LineChart";
import Resume from "./Resume";
import { Link } from "react-router-dom";
import Table from "./MoreInfo";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

// Registrar componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// Ejemplo de datos
const incomeData = [2000, 2500, 2200, 2700, 2900];
const expenseData = [1500, 1700, 1600, 1800, 2000];
const expenseCategories = {
  Alquiler: 500,
  Alimentos: 300,
  Transporte: 150,
  Otros: 200,
};

const Dashboard = () => {
 
  // Configuración del gráfico de líneas
  const lineChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ingresos",
        data: incomeData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Gastos",
        data: expenseData,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  // Configuración del gráfico de dona
  const doughnutChartData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Panel de Resumen */}
      <Link to="/gastgo">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-6">
          Definir Ingresos y Gastos
        </button>
        </Link>
      <Resume />
      {/* Gráfico de Líneas */}
      <LineChart lineChartData={lineChartData} />
      {/* Más Información */}
      <Table doughnutChartData={doughnutChartData} />
    </div>
  );
};

export default Dashboard;
