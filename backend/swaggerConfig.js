import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi  from "swagger-ui-express";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Grocery Store API',
            version: '1.0.0',
            description: 'API documentation for Grocery Store Capstone Project'
        },
        servers: [
            {
                url: 'https://api-msib-6-grocery-delivery-02.educalab.id:4383/api',
            },
        ],
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
};

export default setupSwagger;