var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5000);
// WARNING: app.listen(80) will NOT work here!

io.on('connection', socket => {
    console.log('Someone connected')

    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
