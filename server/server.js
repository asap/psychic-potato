const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app'),
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'A new user joined'),
  );
  
  socket.on('createMessage', (message, callback) => {
    console.log('message created', message);
    const {
      from,
      text,
    } = message;
    io.emit('newMessage', generateMessage(from, text));
    callback('Message Recieved!');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
