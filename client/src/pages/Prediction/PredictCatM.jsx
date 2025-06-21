import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CombinedSalesChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const historicalRes = await fetch("http://localhost:5000/historical/category/monthly");
                const predictionRes = await fetch("http://localhost:5000/prediction/category/monthly");

                const historicalData = await historicalRes.json();
                const predictionData = await predictionRes.json();

                console.log("Raw Historical Data:", historicalData);
                console.log("Raw Prediction Data:", predictionData);

                // Fix: Use correct keys for date
                const mergedData = historicalData.map((item) => {
                    const dateKey = item["Year-Month"]?.trim(); // Fix for date key
                
                    return {
                        date: dateKey || "Unknown",
                        historical: item["Furniture"] || 0, 
                        predicted: predictionData.find(pred => pred["Order Date"]?.trim() === dateKey)?.["furniture"] || 0 // Lowercase fix
                    };
                });
                

                console.log("Merged Data:", mergedData);

                setData(mergedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="historical" stroke="#8884d8" name="Historical Sales" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="predicted" stroke="#ff7300" name="Predicted Sales" strokeDasharray="5 5" dot={{ r: 3 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CombinedSalesChart;
