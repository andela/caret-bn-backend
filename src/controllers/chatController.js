/* eslint-disable */
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import models from '../database/models';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';

const { EMPTY_HISTORY, CHAT_HISTORY } = strings.chat;

let onlineUsers = [];
const getLoggedInUser = (token, socket) => {
  if (token === null) {
    socket.emit('connection_error', 'Token not present');
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userObject = {
      socketId: socket.id,
      userId: user.payload.id,
      email: user.payload.email
    }

    const filter = onlineUsers.filter(client  => {
      return client.userId === user.payload.id
    });

    if(filter.length === 0) {
      onlineUsers.push(userObject);
    }else{
      onlineUsers.forEach(client => {
        if(client.userId === user.payload.id){
          client.socketId = socket.id;
        }
      });
    }
    return user;
  } catch (error) {
    socket.emit('connection_error', error.message);
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
  socket.on('sendMessage', async (chatObject) => {
    try { 
    const { user } = socket;
    const { message, target } = chatObject;
    const userInfo = await models.users.findOne({ where: { id: user.payload.id } })

    if(!target.userId){
      io.emit('chatMessage', { sender: userInfo.username, message });
      const newChat = { userId: user.payload.id, message };
      models.chats.create(newChat);
    }else{
      if(target.userId === null || target.userId === '') {
        socket.emit('connection_error', 'Please provide a target user');
      }

      const targetUser = onlineUsers.filter(userItem => userItem.userId == target.userId);

      if(!targetUser[0]) {
        const recepientUser = await models.users.findOne({
          where: {
            id: target.userId
          }
        });
        if(!recepientUser) {
         socket.emit('connection_error','Can\'t find that user');
        }else{
        const privateChat = {
          message: message,
          userId: user.payload.id,
          receiverId: recepientUser.id
        };
        models.chats.create(privateChat);
        socket.emit('connection_error','User Unavailable to responde');
        }   
      }else{
        const frontEndPayload = {
          message: message,
          sender: userInfo.username,
          senderId: user.payload.id 
        }
        socket.broadcast.to(targetUser[0].socketId).emit('privateChat', frontEndPayload);
        const OnlinePrivateChat = {
          message: message,
          userId: user.payload.id,
          receiverId: target.userId
        };
        models.chats.create(OnlinePrivateChat);
      }
    } 
    } catch (error) {
      console.log(error);
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

const viewPrivateChats = async (req, res) => {
  const owner = req.user.payload.id;
  
  const privateChats = await models.chats.findAll({
    attributes: { exclude: ['userId','receiverId'] },
    include: [{ association: 'user', attributes: ['id', 'username', 'email'] },
    { association: 'receiver', attributes: ['id', 'username', 'email'] }],
    where: {receiverId: {[Op.ne]: null}, [Op.or]: [{userId:owner}, {receiverId:owner}]}, 
  });
  
  return responseUtil(res, 200, (!privateChats.length)
    ? EMPTY_HISTORY : CHAT_HISTORY, privateChats);
};

export default { chat, viewChats , viewPrivateChats};
