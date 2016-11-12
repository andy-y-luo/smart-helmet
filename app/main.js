var io = require("socket.io-client")
var socket = io("localhost:3030");
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
