/* eslint-disable */
import jwt from 'jsonwebtoken';
import models from '../database/models';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';

const { EMPTY_HISTORY, CHAT_HISTORY } = strings.chat;

const getLoggedInUser = (token, socket) => {
  if (token === null) {
    socket.emit('connection_error', 'Token not present');
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    socket.emit('connection_error', 'Please provide a valid token');
  }
};

const chat = (io, socket) => {
  try {
    io.use((socket, next) => {
      const { token } = socket.request._query;
        const user = getLoggedInUser(token, socket);
        socket.user = user;
        next();
    });
  } catch (error) {
    socket.emit('connection_error', error.message);
  }

  socket.on('chatMessage', async (chatObject) => {
    try {
    const { user } = socket;
    const { message } = chatObject;
    const userInfo = await models.users.findOne({ where: { id: user.payload.id } })
    
    io.emit('chatMessage', { sender: userInfo.username, message });

    const newChat = { userId: user.payload.id, message };

    models.chats.create(newChat);
    } 
    catch (error) {
      socket.emit('connection_error', 'You can only send messages when you are logged in!');
    }
  });
};

const viewChats = async (req, res) => {
  const chats = await models.chats.findAll({
    attributes: { exclude: ['userId'] },
    include: [{ model: models.users, as: 'user', attributes: ['id', 'username', 'email'] }]
  });
  
  return responseUtil(res, 200, (!chats.length)
    ? EMPTY_HISTORY : CHAT_HISTORY, chats);
};

export default { chat, viewChats };
