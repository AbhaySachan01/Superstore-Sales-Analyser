import React, { useState, useEffect } from "react";
import BarChart from "../../components/BarChart";
import Dropdown from "../../components/Dropdown";
import styles from "./styles.module.css";

// ✅ Format Data for Chart.js
const formatChartData = (data, selectedYear) => {
  if (!data || data.length === 0) return null;

  // Filter data for the selected year
  const filteredData = data.filter((item) => {
    return new Date(item["Order Date"]).getFullYear().toString() === selectedYear;
  });

  // Extract unique months in 'MM' format
  const months = [...new Set(filteredData.map((item) => {
    return String(new Date(item["Order Date"]).getMonth() + 1).padStart(2, "0");
  }))];

  // Extract unique categories
  const categories = [...new Set(filteredData.map((item) => item.Category))];

  // Aggregate sales by category and month
  const datasets = categories.map((category) => {
    return {
      label: category,
      data: months.map((month) => {
        const totalSales = filteredData.reduce((acc, item) => {
          const itemMonth = String(new Date(item["Order Date"]).getMonth() + 1).padStart(2, "0");
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
        setChartData(formatChartData(rawData,year));  
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
