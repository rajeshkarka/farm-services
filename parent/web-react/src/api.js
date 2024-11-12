// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9400', // API Gateway URL
});

//export const fetchExpenses = () => api.get('/api/expenses');
export const fetchProduction = () => api.get('/api/production/total');
export const fetchStock = () => api.get('/api/production/stock');
export const fetchSales = () => api.get('/api/sales/sales');

export default {
  //fetchExpenses,
  fetchProduction,
  fetchStock,
  fetchSales,
};
