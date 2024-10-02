const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Ecommerce API',
        description: 'A simple Express E-Commerce API',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json'; // Location for the output file
const endpointsFiles = ['./server.js'];     // Main file where routes are defined

swaggerAutogen(outputFile, endpointsFiles, doc);
