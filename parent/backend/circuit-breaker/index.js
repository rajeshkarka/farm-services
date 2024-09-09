const express = require('express');
const axios = require('axios'); // For making HTTP requests
const CircuitBreaker = require('opossum'); // Import opossum for circuit breaker

const app = express();
const PORT = process.env.PORT || 3000;

// Example service URL that the circuit breaker will protect
const protectedServiceUrl = 'http://expenses-service:3000/api/expenses';

// Function to make a request to the protected service
async function fetchExpenses() {
  try {
    const response = await axios.get(protectedServiceUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch expenses');
  }
}

// Circuit breaker options
const options = {
  timeout: 5000, // If the request takes longer than 5 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
  resetTimeout: 10000, // After 10 seconds, try again to close the circuit
};

// Create a circuit breaker for the fetchExpenses function
const breaker = new CircuitBreaker(fetchExpenses, options);

// Listen to circuit breaker events for logging or monitoring
breaker.on('open', () => console.log('Circuit is open, requests will fail fast.'));
breaker.on('halfOpen', () => console.log('Circuit is half-open, next request will test.'));
breaker.on('close', () => console.log('Circuit is closed, requests are normal.'));

// API endpoint to test the circuit breaker
app.get('/api/expenses', async (req, res) => {
  try {
    const data = await breaker.fire();
    res.json(data);
  } catch (error) {
    res.status(503).json({ message: 'Service temporarily unavailable. Please try again later.' });
  }
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Circuit Breaker service is running on port ${PORT}`);
});
