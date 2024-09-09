const express = require('express');
const os = require('os');
const process = require('process');

const app = express();
const port = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// System metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    loadAverage: os.loadavg(),
    cpuCount: os.cpus().length,
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
  };
  res.status(200).json(metrics);
});

// Start the server
app.listen(port, () => {
  console.log(`Monitoring service listening on port ${port}`);
});
