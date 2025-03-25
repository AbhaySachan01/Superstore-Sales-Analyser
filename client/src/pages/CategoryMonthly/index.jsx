import React, { useState, useEffect } from "react";
import BarChart from "../../components/BarChart";
import Dropdown from "../../components/Dropdown";
import styles from "./styles.module.css";

// ✅ Format Data for Chart.js
const formatChartData = (data) => {
  if (!data || data.length === 0) return null;

  // Extract unique months in 'YYYY-MM' format
  const months = [...new Set(data.map((item) => {
    const date = new Date(item["Order Date"]);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }))];

  // Extract unique categories
  const categories = [...new Set(data.map((item) => item.Category))];

  // Aggregate sales by category and month
  const datasets = categories.map((category) => {
    return {
      label: category,
      data: months.map((month) => {
        const totalSales = data.reduce((acc, item) => {
          const itemMonth = new Date(item["Order Date"]).toISOString().slice(0, 7);
          return item.Category === category && itemMonth === month ? acc + item.Sales : acc;
        }, 0);
        return totalSales;
      }),
      backgroundColor: getRandomColor(),
    };
  });

  return { labels: months, datasets };
};

// ✅ Random Color Generator
const getRandomColor = () => {
  return `hsl(${Math.floor(Math.random() * 360)}, 90%, 50%)`;
};

const CategoryMonthly = () => {
  const [year, setYear] = useState("2019"); // Default Year
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/analysis/category/monthly?year=${year}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();
        console.log("Fetched Data:", rawData);
        setChartData(formatChartData(rawData));  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [year]);

  return (
    <div className={styles.container}>
  <h2 className={styles.title}>Category-wise Monthly Sales</h2>
  <div className={styles.dropdownContainer}>
    <Dropdown
      label="Select Year"
      options={["2019", "2020", "2021", "2022"]}
      selected={year}
      onChange={setYear}
    />
  </div>
  <div className={styles.chartContainer}>
    <BarChart
      chartData={chartData || { labels: [], datasets: [] }}
      title={`Sales Data for ${year}`}
    />
  </div>
</div>

  );
};

export default CategoryMonthly;
