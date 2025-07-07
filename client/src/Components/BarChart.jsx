import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ chartData, title }) => {
  return (
  <div style={{ width:"100%", height: "620px" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          // maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
          scales: {
            x: {
              type: "category", // ✅ Ensure category scale is correctly used
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
