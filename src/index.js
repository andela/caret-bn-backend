import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Barefoot Nomad!',
  });
});

app.use('*', (req, res) => {
  res.status(400).json({
    status: 400,
    message: 'Sorry this router does not exist !',
  });
});
const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Barefoot Nomad is runnig server On port ${port}...`));

export default app;
