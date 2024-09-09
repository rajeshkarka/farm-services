const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const logFilePath = path.join(__dirname, 'logs', 'app.log');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Ensure log directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Endpoint to log messages
app.post('/log', (req, res) => {
  const { level, message } = req.body;

  if (!level || !message) {
    return res.status(400).json({ error: 'Level and message are required' });
  }

  const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}] ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing log:', err);
      return res.status(500).json({ error: 'Failed to write log' });
    }
    res.status(201).json({ status: 'Log entry created' });
  });
});

// Endpoint to retrieve logs
app.get('/logs', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      return res.status(500).json({ error: 'Failed to read logs' });
    }
    res.status(200).send(data);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Logging service listening on port ${port}`);
});
