/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import socketIo from 'socket.io';
import errorhandler from 'errorhandler';
import cors from 'cors';
import allRoutes from './routes';
import chatController from './controllers/chatController';
import decodeToken from './middlewares/auth/decodeToken';

// Create global app object
dotenv.config();

const app = express();
app.use(cors());
const http = require('http').createServer(app);

const io = socketIo(http);
const { chat } = chatController;
const port = process.env.APPLICATION_PORT || process.env.PORT;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

if (!isProduction) {
  app.use(errorhandler());
}

app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && isProduction) {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

io.on('connect', socket => {
  chat(io, socket);
  socket.on('disconnect', () => {
    socket.disconnect();
  });
});

http.listen(port, () => console.log(`Barefoot Nomad is runnig server on port ${port}...`));

const connectedClients = {};
io.use((socket, next) => {
  const { token } = socket.handshake.query;
  try {
    const userData = decodeToken(token);
    if (userData) {
      const clientKey = Number.parseInt(userData.payload.id, 10);
      connectedClients[clientKey] = connectedClients[clientKey] || [];
      connectedClients[clientKey].push(socket.id);
    }
    next();
  } catch (error) {
    return (error);
  }
});


app.use((req, res, next) => {
  req.io = io;
  req.connectedClients = connectedClients;
  next();
});

app.use('/', allRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Sorry this route does not exist !',
  });
});

export { io };

export default app;
