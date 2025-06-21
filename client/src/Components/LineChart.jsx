import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const LineChartComponent = ({ apiEndpoint, title }) => {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((jsonData) => {
        if (!jsonData.error) {
          setData(jsonData);
          setKeys(Object.keys(jsonData[0] || {}).filter((key) => key !== "Year-Month" && key !== "Year-Week"));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiEndpoint]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={data[0]?.["Year-Month"] ? "Year-Month" : "Year-Week"} />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Line key={index} type="monotone" dataKey={key} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} strokeWidth={2} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

LineChartComponent.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LineChartComponent;
