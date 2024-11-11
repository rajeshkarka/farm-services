// src/components/StockChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = () => {
  // Sample data for stock levels
  const data = [
    { month: 'Jan', stockLevel: 200 },
    { month: 'Feb', stockLevel: 250 },
    { month: 'Mar', stockLevel: 220 },
    { month: 'Apr', stockLevel: 300 },
    { month: 'May', stockLevel: 350 },
    { month: 'Jun', stockLevel: 400 },
    { month: 'Jul', stockLevel: 380 },
  ];

  return (
    <div>
      <h2>Stock Chart</h2>
      <p>Stock levels and inventory over time.</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="stockLevel" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
