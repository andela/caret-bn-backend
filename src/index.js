// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import allRoutes from './routes';

// Create global app object
dotenv.config();

const app = express();
const port = process.env.APPLICATION_PORT || process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Barefoot Nomad!',
  });
});

app.use('/', allRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Sorry this route does not exist !',
  });
});
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Barefoot Nomad is runnig server on port ${port}...`));

export default app;
