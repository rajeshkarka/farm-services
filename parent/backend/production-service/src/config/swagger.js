// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Farm Maintenance API',
      description: 'API documentation for farm maintenance system',
    },
    host: 'localhost:5001',
    schemes: ['http'],
  };
  
  const outputFile = './swagger-output.json';
  const endpointsFiles = ['./src/routes/*.js']; // Your route files
  
  swaggerAutogen(outputFile, endpointsFiles, doc);
  
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Farm Maintenance API',
      version: '1.0.0',
      description: 'API documentation for farm maintenance system',
    },
    servers: [
      {
        url: 'http://localhost:5001/api', // Replace with your server URL
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
