const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

// Proxy settings
const serviceUrls = {
  'expenses-service': 'http://expenses-service:3004',
  'expenses-type-service': 'http://expenses-type-service:3006',
  'sales-service': 'http://sales-service:3005',
  'employee-service': 'http://employee-service:3002',
  'salary-management-service':'http://salary-management-service:3003',
  'production-service': 'http://production-service:3001',
  'feed-management-service' : 'http://feed-management-service:3007'

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

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});


