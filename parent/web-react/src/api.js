// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9400', // API Gateway URL
});

export const fetchExpenses = () => api.get('/expenses-service/api/expenses');
export const fetchProduction = () => api.get('/production-service/api/production');
export const fetchStock = () => api.get('/stock-service/stock');
export const fetchSales = () => api.get('/sales-service/api/sales');

export default {
  fetchExpenses,
  fetchProduction,
  fetchStock,
  fetchSales,
};
