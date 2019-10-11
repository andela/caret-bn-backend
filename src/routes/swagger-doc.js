import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const router = new Router();

const swaggerUrl = process.env.NODE_ENV === 'development' ? `localhost:${process.env.APPLICATION_PORT}` : 'caret-bn-backend.herokuapp.com';

const swaggerDefinition = {
  info: {
    title: '^Carets Barefoot Nomad API',
    version: '1.0.0',
    description: 'Barefoot Nomad - Making company travel and accomodation easy and convinient',
  },
  host: swaggerUrl,
  basePath: '/api/v1',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/api/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
