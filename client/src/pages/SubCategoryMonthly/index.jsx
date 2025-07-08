import React, { useState, useEffect } from "react";
import BarChart from "../../Components/BarChart";
import Dropdown from "../../Components/Dropdown";
import styles from "./styles.module.css";

// ✅ Format Data for Chart.js
const formatChartData = (data, selectedYear) => {
  if (!data || data.length === 0) return null;

  // Filter for selected year
  const filteredData = data.filter((item) =>
    new Date(item["Order Date"]).getFullYear().toString() === selectedYear
  );

  // Extract unique months (in order)
  const months = [...new Set(filteredData.map((item) => {
    const date = new Date(item["Order Date"]);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }))];

  // Extract unique subcategories
  const subcategories = [...new Set(filteredData.map((item) => item["Sub-Category"]))];

  // Aggregate sales
  const datasets = subcategories.map((subcategory) => ({
    label: subcategory,
    data: months.map((month) => {
      const totalSales = filteredData.reduce((acc, item) => {
        const itemMonth = new Date(item["Order Date"]).toISOString().slice(0, 7);
        return item["Sub-Category"] === subcategory && itemMonth === month
          ? acc + item.Sales
          : acc;
      }, 0);
      return totalSales;
    }),
    backgroundColor: getRandomColor(),
  }));

  return { labels: months, datasets };
};


// ✅ Random Color Generator (RGB format)
const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 90%, 50%)`;
  };
  
const SubCategoryMonthly = () => {
  const [year, setYear] = useState("2019"); // Default Year
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/analysis/subcategory/monthly?year=${year}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const rawData = await response.json();
      setChartData(formatChartData(rawData, year));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, [year]);

  return (
    <div className={styles.container}>
  <h2 className={styles.title}>Subcategory-wise Monthly Sales</h2>
  <div className={styles.dropdownContainer}>
    <Dropdown
      label="Select Year"
      options={["2019", "2020", "2021","2022"]}
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

export default SubCategoryMonthly;
