const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 9400;

// Proxy settings
const serviceUrls = {
  'expenses-service': 'http://backend-expenses-service-1:3004',
  'expenses-type-service': 'http://backend-expenses-type-service-1:3006',
  'sales-service': 'http://backend-sales-service-1:3005',
  'employee-service': 'http://backend-employee-service-1:3002',
  'salary-management-service':'http://backend-salary-management-service-1:3003',
  'production-service': 'http://backend-production-service-1:3001',
  'feed-management-service' : 'http://backend-feed-management-service-1:3007'

  // Add other services as needed
};

// Setup routes to forward requests to the appropriate services
Object.keys(serviceUrls).forEach(serviceName => {
  app.use(`/${serviceName}`, createProxyMiddleware({
    target: serviceUrls[serviceName],
    changeOrigin: true,
    pathRewrite: {
      [`^/${serviceName}`]: '',
    },
  }));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway Server is running on port ${port}`);
});



app.use((req, res, next) => {
  console.log(`Proxying request to: ${req.url}`);
  next();
});
