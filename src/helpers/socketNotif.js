const socketNotif = (receiverId, data, connectedClients, io) => {
  if (!receiverId) {
    io.emit('notification', data);
  } else if (connectedClients[receiverId.toString()]) {
    connectedClients[receiverId.toString()].forEach(element => {
      io.to(element).emit('notification', data);
    });
  }
};

export default socketNotif;
