var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var net = require('net');
var _ = require('lodash');
const readline = require('readline');

devices = {1:{name: "Dank Test Device", id:1}}

app.listen(3030);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  _.mapValues(devices, function(device){
    socket.emit('helmet', device)
  })
});

var server = net.createServer((socket) => {
  rl = readline.createInterface({
    input: socket
  });
  rl.question("", function(input){
    var id = input
    if(devices[id] == undefined){
      devices[id] = {id: id, name:"New Device"}
      io.emit('helmet', devices[id]);
    }
    rl.on('line', function(input){
      console.log(input)
    })
  })
})

setInterval(function(){
  _.mapValues(devices, function(device){
    io.emit('helmet-reading', {id: device.id, time:new Date(), value:Math.random()})
  })
}, 100);

server.listen(3031);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
