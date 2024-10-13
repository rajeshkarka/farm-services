// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // API Gateway URL
});

export const fetchExpenses = () => api.get('/expenses-service/expenses');

