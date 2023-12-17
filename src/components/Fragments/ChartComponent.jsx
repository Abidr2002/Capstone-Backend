import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChartComponent = ({ bmiData, dates, weightData, heightData }) => {
  const chartData = dates.map((date, index) => ({
    date,
    BMI: bmiData[index],
    Weight: weightData[index],
    Height: heightData[index],
  }));

  return (
    <LineChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="BMI"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        name="BMI"
      />
      <Line
        type="monotone"
        dataKey="Weight"
        stroke="#82ca9d"
        activeDot={{ r: 8 }}
        name="Weight"
      />
      <Line
        type="monotone"
        dataKey="Height"
        stroke="#ffc658"
        activeDot={{ r: 8 }}
        name="Height"
      />
    </LineChart>
  );
};

export default ChartComponent;
