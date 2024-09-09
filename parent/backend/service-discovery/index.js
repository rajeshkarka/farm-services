const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// In-memory service registry
const serviceRegistry = {};

// Middleware to parse JSON bodies
app.use(express.json());

// Register a new service
app.post('/register', (req, res) => {
  const { serviceName, serviceUrl } = req.body;
  
  if (!serviceName || !serviceUrl) {
    return res.status(400).json({ error: 'Service name and URL are required' });
  }
  
  serviceRegistry[serviceName] = serviceUrl;
  res.status(201).json({ message: 'Service registered successfully' });
});

// Discover a service
app.get('/discover/:serviceName', (req, res) => {
  const { serviceName } = req.params;
  
  const serviceUrl = serviceRegistry[serviceName];
  
  if (serviceUrl) {
    res.status(200).json({ serviceName, serviceUrl });
  } else {
    res.status(404).json({ error: 'Service not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Service Discovery running on port ${port}`);
});
