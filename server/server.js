const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const { generateMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    const {
      name,
      room,
    } = params;

    if (!isRealString(name) || !isRealString(room)) {
      return callback('Name and Room Name are required');
    }

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app'),
    );

    socket.broadcast.to(room).emit(
      'newMessage',
      generateMessage('Admin', `${name} has joined`),
    );

    callback();
  });
  
  socket.on('createMessage', (message, callback) => {
    console.log('message created', message);
    const {
      from,
      text,
    } = message;
    io.emit('newMessage', generateMessage(from, text));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
