import React from "react";
import { Line } from "react-chartjs-2";
const LineChart = ({ lineChartData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Ingresos vs Gastos
      </h3>
      <div className="w-full h-80">
        <Line
          data={lineChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.dataset.label}: $${context.raw}`,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                  callback: (value) => `$${value}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
