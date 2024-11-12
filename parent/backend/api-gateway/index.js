/*const express = require('express');
const request = require('request-promise-native');
const app = express();

const productionServiceUrl = 'http://localhost:3001/api/production';

app.get('/api/production/track', async (req, res) => {
  try {
    const targetUrl = `${productionServiceUrl}/track`; // Full URL to the production-service endpoint
    console.log(`Proxying request to: ${targetUrl}`);

    const response = await request({
      uri: targetUrl,
      method: req.method, // Forward the original request method
      json: true,         // Parse JSON response automatically
    });

    res.json(response); // Send the response back to the client
  } catch (error) {
    console.error('Error proxying to production-service:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 9400;
app.listen(port, () => {
  console.log(`API Gateway Server is running on port ${port}`);
});


// Proxy settings
const serviceUrls = {
  'api/production': 'http://localhost:3001',
  'api/expenses': 'http://backend-expenses-service-1:3004',
  'api/expenses-type': 'http://backend-expenses-type-service-1:3006',
  'api/sales': 'http://backend-sales-service-1:3005',
  'api/employee': 'http://backend-employee-service-1:3002',
  'api/salary-management': 'http://backend-salary-management-service-1:3003',
  'api/feed-management': 'http://backend-feed-management-service-1:3007'
};
*/

const express = require('express');
const request = require('request-promise-native');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000' // or whatever your frontend's URL is
}));

// Proxy settings
const serviceUrls = {
  'api/production': 'http://localhost:3001/api/production',
  'api/expenses': 'http://localhost:3004/api/expenses',
  'api/expenses-type': 'http://backend-expenses-type-service-1:3006/api/expenses-type',
  'api/sales': 'http://localhost:3005/api/sales',
  'api/employee': 'http://backend-employee-service-1:3002/api/employee',
  'api/salary-management': 'http://backend-salary-management-service-1:3003/api/salary-management',
  'api/feed-management': 'http://backend-feed-management-service-1:3007/api/feed-management'
};

// Loop over each service URL to set up a dynamic proxy route
Object.keys(serviceUrls).forEach(servicePath => {
  const targetUrl = serviceUrls[servicePath];

  app.use(`/${servicePath}/*`, async (req, res) => {
    const endpoint = req.params[0] || ''; // Capture any sub-path after servicePath
    const targetEndpoint = `${targetUrl}/${endpoint}`;

    try {
      console.log(`Proxying request from ${req.originalUrl} to ${targetEndpoint}`);

      // Forward request to the target service
      const response = await request({
        uri: targetEndpoint,
        method: req.method,
        body: req.body,
        qs: req.query,
        json: true
      });

      res.json(response);
    } catch (error) {
      console.error(`Error proxying to ${servicePath}:`, error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

const port = process.env.PORT || 9400;
app.listen(port, () => {
  console.log(`API Gateway Server is running on port ${port}`);
});
