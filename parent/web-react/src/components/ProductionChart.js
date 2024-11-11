// frontend/src/components/ProductionChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', eggs: 400 },
  { day: 'Tue', eggs: 300 },
  { day: 'Wed', eggs: 500 },
  { day: 'Thu', eggs: 450 },
  { day: 'Fri', eggs: 600 },
];

const ProductionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
         <div>
         <h2>Production Chart</h2>
         <p>Daily production data.</p>
         </div>
      <LineChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="eggs" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductionChart;
