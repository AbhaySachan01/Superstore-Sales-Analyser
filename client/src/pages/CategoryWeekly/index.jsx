import React, { useState, useEffect } from "react";
import BarChart from "../../Components/BarChart";
import Dropdown from "../../Components/Dropdown";
import styles from "./styles.module.css";

const getISOWeek = (date) => {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7)); // Adjust to Thursday
  const yearStart = new Date(tempDate.getFullYear(), 0, 1);
  return Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
};

const formatChartData = (data, selectedYear) => {
  if (!data || data.length === 0) return null;

  // Filter data for the selected year
  const filteredData = data.filter((item) => {
    return new Date(item["Order Date"]).getFullYear().toString() === selectedYear;
  });

  // Extract unique weeks in 'YYYY-WW' format using ISO week number
  const weeks = [...new Set(filteredData.map((item) => {
    const date = new Date(item["Order Date"]);
    const week = getISOWeek(date);
    return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
  }))].sort(); // Sort weeks in order

  // Extract unique categories
  const categories = [...new Set(filteredData.map((item) => item.Category))];

  // Aggregate sales by category and week
  const datasets = categories.map((category) => {
    return {
      label: category,
      data: weeks.map((week) => {
        const totalSales = filteredData.reduce((acc, item) => {
          const itemDate = new Date(item["Order Date"]);
          const itemWeek = `${itemDate.getFullYear()}-W${String(getISOWeek(itemDate)).padStart(2, "0")}`;
          return item.Category === category && itemWeek === week ? acc + item.Sales : acc;
        }, 0);
        return totalSales;
      }),
      backgroundColor: getRandomColor(),
    };
  });

  return { labels: weeks, datasets };
};


// ✅ RGB Format Color Generator
const getRandomColor = () => {
  return `hsl(${Math.floor(Math.random() * Math.random() * 360 * Math.random())}, 90%, 50%)`;
};


const CategoryWeekly = () => {
  const [year, setYear] = useState("2019"); // Default Year
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/analysis/category/weekly?year=${year}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();
        console.log("Fetched Data:", rawData);
        setChartData(formatChartData(rawData, year)); // Pass selected year
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [year]);
  

  return (
    <div className={styles.container}>
  <h2 className={styles.title}>Category-wise Weekly Sales</h2>
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

export default CategoryWeekly;
