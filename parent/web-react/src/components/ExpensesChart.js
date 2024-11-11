import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpensesChart = () => {
  // Sample expenses data
  const data = [
    { month: 'Jan', expenses: 1000 },
    { month: 'Feb', expenses: 1200 },
    { month: 'Mar', expenses: 1500 },
    { month: 'Apr', expenses: 1300 },
    { month: 'May', expenses: 1600 },
    { month: 'Jun', expenses: 1700 },
    { month: 'Jul', expenses: 1800 },
  ];

  return (
    <div>
      <h2>Expenses Chart</h2>
      <p>Track expenses for the farm maintenance.</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesChart;
