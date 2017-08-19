const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const db = require('../db');
const model = require('../db/models/model');
const routes = require('./routes/routes');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

const PORT = 8080;


app.use(parser.json());
app.use(parser.urlencoded( {extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../static')));

app.use(cors());

app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'))
});

// socket.io
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Successfully connected to PORT ${PORT}`)
  }
});

// io.listen(PORT);
// console.log('socket is listening on port', PORT);

io.on('connection', socket => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected')
    });

  socket.on('send message', msg => {
    console.log('message: ' + msg)
    io.sockets.emit('chat message', msg);
  })

  socket.on('new-match', function() {
    console.log('setting match notification to true');
    io.emit('newMatch');
  })

  socket.on('new-message', function() {
    console.log('setting message notification to true');
    io.emit('newMessage');
  })

  socket.on('new-videochat', function() {
    console.log('setting video chat notification to true');
    io.emit('newVideoChat');
  })

  socket.on('match-viewed', function() {
    console.log('setting match notification to false');
    io.emit('matchViewed');
  })

  socket.on('message-viewed', function() {
    console.log('setting message notification to false');
    io.emit('messageViewed');
  })

  socket.on('videochat-viewed', function() {
    console.log('setting video chat notification to false');
    io.emit('videoChatViewed');
  })

})

