import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi elemen Chart.js yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpensePieChart = ({ income, expense }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#16A34A", "#DC2626"], // Hijau untuk Income, Merah untuk Expense
        hoverBackgroundColor: ["#15803D", "#B91C1C"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-[250px]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default IncomeExpensePieChart;
