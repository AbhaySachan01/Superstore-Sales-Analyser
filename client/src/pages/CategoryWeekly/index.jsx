import React, { useState, useEffect } from "react";
import BarChart from "../../components/BarChart";
import Dropdown from "../../components/Dropdown";
import styles from "./styles.module.css";

const formatChartData = (data) => {
  if (!data || data.length === 0) return null;

  const weeks = [...new Set(data.map((item) => item["Order Date"].slice(0, 10)))]; // Extracting weeks
  const categories = [...new Set(data.map((item) => item.Category))];

  const datasets = categories.map((category) => {
    return {
      label: category,
      data: weeks.map((week) => {
        const entry = data.find(
          (item) => item.Category === category && item["Order Date"].startsWith(week)
        );
        return entry ? entry.Sales : 0;
      }),
      backgroundColor: getRandomColor(),
    };
  });

  return {
    labels: weeks,
    datasets: datasets,
  };
};

// ✅ RGB Format Color Generator
const getRandomColor = () => {
  return `hsl(${Math.floor(Math.random() * 360)}, 90%, 50%)`;
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
        setChartData(formatChartData(rawData));  // ✅ Yaha format kar raha hu
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
